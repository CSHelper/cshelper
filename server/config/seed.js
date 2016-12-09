/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
let User = sqldb.User;
let Problem = sqldb.Problem;
let DataSet = sqldb.Dataset;
let TutorStudent = sqldb.TutorStudent;
let Assignment = sqldb.Assignment;

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      _id: 7,
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }, {
      _id: 1,
      provider: 'local',
      name: 'Frank Sanchez',
      email: 'fsanchez@example.com',
      password: 'test'
    }, {
      _id: 2,
      provider: 'local',
      name: 'Nghia Tran',
      email: 'ntran@example.com',
      password: 'test'
    }, {
      _id: 3,
      provider: 'local',
      name: 'Sunny Aroh',
      email: 'saroh@example.com',
      password: 'test'
    }, {
      _id: 4,
      provider: 'local',
      name: 'Dustin Cox',
      email: 'dcox@example.com',
      password: 'test'
    }, {
      _id: 5,
      provider: 'local',
      name: 'Tommy Shay',
      email: 'tshay@example.com',
      password: 'test'
    }, {
      _id: 6,
      provider: 'local',
      role: 'tutor',
      name: 'Eric Gerardi',
      email: 'egarardi@example.com',
      password: 'test'
    }])
    .then(() => {
      console.log('finished populating users');
      TutorStudent.sync()
        .then(() => {
          return TutorStudent.destroy({ where: {} });
        })
        .then(() => {
          TutorStudent.bulkCreate([{
              tutorId: 6,
              studentId: 1
            }, {
              tutorId: 6,
              studentId: 2
            }, {
              tutorId: 6,
              studentId: 3
            }, {
              tutorId: 6,
              studentId: 4
            }, {
              tutorId: 6,
              studentId: 5
            }]);
        });
    });
  })
  .then(() => {
    createProlems()
  })

function createProlems() {
  Problem.sync()
    .then(() => Problem.destroy({ where: {} }))
    .then(() => {
      return Problem.bulkCreate([{
        _id: 1,
        title: 'Addition',
        language: 'c',
        description: 'Create code to add two integers together and produce expectedOutput',
        functionName: 'addition'
      },{
        _id: 2,
        title: 'Subtraction',
        language: 'c',
        description: 'Create code to subtract two integers together and produce expectedOutput',
        functionName: 'subtraction'
      },{
        _id: 3,
        title: 'Multiplication',
        language: 'c',
        description: 'Create code to multiply two integers together and produce expectedOutput',
        functionName: 'multiply'
      }])
    })
    .then(() => {
      return Assignment.sync()
        .then(() => Assignment.destroy({ where: {} }))
        .then(() => {
          Assignment.bulkCreate([{
            problemId: 1,
            assigneeId: 1,
            assignerId: 7,
          },{
            problemId: 1,
            assigneeId: 2,
            assignerId: 7,
          },{
            problemId: 1,
            assigneeId: 3,
            assignerId: 7,
          },{
            problemId: 1,
            assigneeId: 4,
            assignerId: 7,
          },{
            problemId: 2,
            assigneeId: 1,
            assignerId: 7,
          },{
            problemId: 2,
            assigneeId: 2,
            assignerId: 7,
          },{
            problemId: 2,
            assigneeId: 3,
            assignerId: 7,
          },{
            problemId: 3,
            assigneeId: 1,
            assignerId: 7,
          },{
            problemId: 3,
            assigneeId: 2,
            assignerId: 7,
          },{
            problemId: 3,
            assigneeId: 3,
            assignerId: 7,
          },{
            problemId: 3,
            assigneeId: 4,
            assignerId: 7,
          },{
            problemId: 3,
            assigneeId: 5,
            assignerId: 7,
          }])
        })
    })
    .then(() => {
      DataSet.sync()
        .then(() => DataSet.destroy({ where: {} }))
        .then(() => {
          DataSet.bulkCreate([{
            inputs: [{
                value:2, dataType:'int'
              },{
                value:3, dataType: 'int'
              }
            ],
            expectedOutput: {
              value:5,dataType: 'int'
            },
            problemId: 1

          },{
            inputs: [{
                value:1, dataType:'int'
              },{
                value:2, dataType: 'int'
              }
            ],
            expectedOutput: {
              value:3,dataType: 'int'
            },
            problemId: 1
          },{
            inputs: [{
                value: 4, 
                dataType: 'int'
              },{
                value: 2,
                dataType: 'int'
              }
            ],
            expectedOutput: {
              value:2,
              dataType: 'int'
            },
            problemId: 2
          },{
            inputs: [{
                value: 100, 
                dataType: 'int'
              },{
                value:2, dataType: 'int'
              }
            ],
            expectedOutput: {
              value: 98,
              dataType: 'int'
            },
            problemId: 2
          },{
            inputs: [{
                value: 100, 
                dataType: 'int'
              },{
                value:2, dataType: 'int'
              }
            ],
            expectedOutput: {
              value: 200,
              dataType: 'int'
            },
            problemId: 3
          },{
            inputs: [{
                value: 50, 
                dataType: 'int'
              },{
                value: 3, dataType: 'int'
              }
            ],
            expectedOutput: {
              value: 150,
              dataType: 'int'
            },
            problemId: 3
          }])
          .then(() => {
            console.log('finished populating problems');
          });
        });

      });

    
}