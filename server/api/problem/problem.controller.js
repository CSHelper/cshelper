/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/problems              ->  index
 * POST    /api/problems              ->  create
 * GET     /api/problems/:id          ->  show
 * PUT     /api/problems/:id          ->  upsert
 * PATCH   /api/problems/:id          ->  patch
 * DELETE  /api/problems/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Problem, Dataset, Assignment, AssignmentDetail} from '../../sqldb';

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
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Problems
export function index(req, res) {
  let myproblems;
  return Problem.findAll()
    .then(function (problems) {
      myproblems = problems;
      return AssignmentDetail.findAll({
        where: {
          assignerId: req.user._id
        }
      });
    })
    .then(function (assignments) {
      let assignmentGroup = {};
      // for (var i = 0; i < assignments.length; i++) {
      //   if (assignmentGroup[assignments[i].problemId]) {
      //     assignmentGroup[assignments[i].problemId].push(assignments[i]);
      //   } else {
      //     assignmentGroup[assignments[i].problemId] = [assignments[i]];
      //   }
      // }

      // for (let key in assignmentGroup) {
      //   for (var i = 0; i < myproblems.length; i++) {
      //     if (myproblems[i]._id = key) {
      //       myproblems[i].assignTo = assignmentGroup[i];
      //     }
      //   }
      // }

      return {
        problems: myproblems,
        assignments
      };
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Problem from the DB
export function show(req, res) {
  let problem;
  return Problem.find({
    where: {
      _id: req.params.id
    }
  })
    .then(function (result) {
      problem = result;
      return Dataset.findAll({
        where: {
          problemId: req.params.id
        }
      })
    })
    .then(function (results) {
      //for (var i = 0; i < results.length; i++) {
        //results[i].inputs = parse(results[i].inputs);
        //results[i].expectedOutput = JSON.parse(results[i].expectedOutput);
      //}
      
      return {
        dataset: results,
        problem
      }
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Problem in the DB
export function create(req, res) {
  let problemId;
  return Problem.create(req.body)
    .then(function(problem){
      problemId = problem._id;
      for (var i = req.body.testCases.length - 1; i >= 0; i--) {
        req.body.testCases[i].problemId = problem._id;
      };
      return Dataset.bulkCreate(req.body.testCases)
    })
    .then(function () {
      if (req.body.assignees) {
        let assignment = [];

        for (var i = req.body.assignees.length - 1; i >= 0; i--) {
          assignment.push({
            assigneeId: req.body.assignees[i],
            assignerId: req.user._id,
            problemId
          })
        };
        return Assignment.bulkCreate(assignment);
      }
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Problem in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Problem.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Problem in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Problem.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Problem from the DB
export function destroy(req, res) {
  return Problem.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
