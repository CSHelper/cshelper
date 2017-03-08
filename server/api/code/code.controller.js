/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/codes              ->  index
 * POST    /api/codes              ->  create
 * POST    /api/codes/run          ->  run
 * GET     /api/codes/:id          ->  show
 * PUT     /api/codes/:id          ->  upsert
 * PATCH   /api/codes/:id          ->  patch
 * DELETE  /api/codes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Code,TestView} from '../../sqldb';
import {testC} from './languages/c';
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

  // Find all test data
  TestView.findAll({where: {problemId: req.body.code.id}})
    .then(function (results) {
      // Do testing
      dataSets = results;
      let tests = [];

      for(let i = 0; i < dataSets.length; i++)
        tests.push(testC(results[i], req.body.code));

      console.log("findAll 1")

      return Promise.all(tests);
    })
    .then(function () {
      // Check if all passed
      let entry = req.body.code;
      entry.isSuccess = true;
      for (let i = 0; i < dataSets.length; i++) {
        if(dataSets[i] !== true) {
          entry.isSuccess = false;
        }
      }
      
      // Create try entry in database

      console.log("findAll 2")

      return Code.create(entry);
    })
    .then(function(){
      // Finalize result
      let results = [];
      console.log(dataSets.length)
      for (let i = 0; i < dataSets.length; i++) {
        let object = {
          isSuccess: dataSets[i].isSuccess,
          _id: dataSets[i]._id,
          output: dataSets[i].output
        };
        results.push(object);
      }
      return res.json(results);
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

// Run code
export function run(req, res) {
  return Code.create(entry)
    .then(function(){
      
    })
}

