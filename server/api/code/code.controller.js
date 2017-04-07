/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/codes              ->  index
 * POST    /api/codes              ->  create
 * GET     /api/codes/student/:id  ->  getStudentStats
 * GET     /api/codes/:id          ->  show
 * PUT     /api/codes/:id          ->  upsert
 * PATCH   /api/codes/:id          ->  patch
 * DELETE  /api/codes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Code, TestView, UserCodeView} from '../../sqldb';
import {testC} from './languages/c';
import {testPy} from './languages/python';
import {testJS} from './languages/javascript';
import bluebird from 'bluebird';

Promise = bluebird;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err)
    res.status(statusCode).send(err);
  };
}

// Gets a list of Codes
export function index(req, res) {
  return Code.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Code from the DB
export function show(req, res) {
  return Code.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Code in the DB
export function create(req, res) {
  let tmp;
  let dataSets;
  let query = {
    where: {
      problemId: req.body.problemId,
      isHidden: !req.body.isSubmit
    }
  };
  console.log(req.body);
  let testFunc;
  switch (req.body.language) {
    case 'c':
      testFunc = testC;
      break;
    case 'python2':
    case 'python3':
      testFunc = testPy;
      break;
    case 'javascript':
      testFunc = testJS;
      break;
    default:
      return res
            .status(400)
            .json({
              error: req.body.language + ' is not supported.'
            });
  }
  let returnData; 

  // Find all test data
  TestView.findAll(query)
    .then(function (results) {
      // Do testing
      dataSets = results;
      return testFunc(dataSets, req);
    })
    .then(function(tests) {
      let entry = req.body;
      entry.userId = req.user._id;
      entry.isSuccess = true;

      // Finalize result
      let results = [];
      for (let i = 0; i < tests.length; i++) {
        if(tests[i].isSuccess !== true) {
          entry.isSuccess = false;
        }

        let object = {
          isSuccess: tests[i].isSuccess,
          _id: tests[i]._id,
          output: tests[i].output
        };
        results.push(object);
      }

      returnData = {
        isSuccess: entry.isSuccess,
        tests: results
      }
      return Code.create(entry);
    })
    .then(function () {
      return res.json(returnData);
    })
    .catch(function (error) {
      let entry = req.body;
      entry.userId = req.user._id;
      entry.isSuccess = false;

      return Code.create(entry)
        .then(function () {
          res
            .status(400)
            .json({
              error: error.message
            });
        })
    })
    .catch(handleError(res));
}

// Upserts the given Code in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Code.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Code in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Code.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Code from the DB
export function destroy(req, res) {
  return Code.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function getStudentStats(req, res) {
  return UserCodeView.findAll({
    where: {
      userId: req.params.id
    },
    order: [
      ['problemId', 'DESC']
    ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}