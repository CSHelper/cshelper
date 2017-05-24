// /**
//  * Populate DB with sample data on server start
//  * to disable, edit config/environment/index.js, and set `seedDB: false`
//  */

// 'use strict';
// import sqldb from '../sqldb';
// const User = sqldb.User;
// const Problem = sqldb.Problem;
// const DataSet = sqldb.Dataset;
// const TutorStudent = sqldb.TutorStudent;
// const Assignment = sqldb.Assignment;
// const Code = sqldb.Code;

// Code.sync()
//   .then(() => Code.destroy({ where: {} }))

// User.sync()
//   .then(() => User.destroy({ where: {} }))
//   .then(() => {
//     return User.bulkCreate([{
//       provider: 'local',
//       name: 'Test User',
//       email: 'test@example.com',
//       password: 'test'
//     }, {
//       _id: 7,
//       provider: 'local',
//       role: 'admin',
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin'
//     }, {
//       _id: 1,
//       provider: 'local',
//       name: 'Frank Sanchez',
//       email: 'fsanchez@example.com',
//       password: 'test'
//     }, {
//       _id: 2,
//       provider: 'local',
//       name: 'Nghia Tran',
//       email: 'ntran@example.com',
//       password: 'test'
//     }, {
//       _id: 3,
//       provider: 'local',
//       name: 'Sunny Aroh',
//       email: 'saroh@example.com',
//       password: 'test'
//     }, {
//       _id: 4,
//       provider: 'local',
//       name: 'Dustin Cox',
//       email: 'dcox@example.com',
//       password: 'test'
//     }, {
//       _id: 5,
//       provider: 'local',
//       name: 'Tommy Shay',
//       email: 'tshay@example.com',
//       password: 'test'
//     }, {
//       _id: 6,
//       provider: 'local',
//       role: 'tutor',  
//       name: 'Eric Gerardi',
//       email: 'egarardi@example.com',
//       password: 'test'
//     }])
//     .then(() => {
//       console.log('finished populating users');
//       return TutorStudent.sync()
//         .then(() => {
//           return TutorStudent.destroy({ where: {} });
//         })
//         .then(() => {
//           return TutorStudent.bulkCreate([{
//               tutorId: 6,
//               studentId: 1
//             }, {
//               tutorId: 6,
//               studentId: 2
//             }, {
//               tutorId: 6,
//               studentId: 3
//             }, {
//               tutorId: 6,
//               studentId: 4
//             }, {
//               tutorId: 6,
//               studentId: 5
//             }]);
//         });
//     });
//   })
//   .then(() => {
//     createProlems()
//   })

// function createProlems() {
//   Problem.sync()
//     .then(() => Problem.destroy({ where: {} }))
//     .then(() => {
//       return Problem.bulkCreate([{
//         _id: 1,
//         title: 'Addition',
//         description: 'Create code to add two integers together and produce expectedOutput'
//       },{
//         _id: 2,
//         title: 'Subtraction',
//         description: 'Create code to subtract two integers together and produce expectedOutput'
//       },{
//         _id: 3,
//         title: 'Multiplication',
//         description: 'Create code to multiply two integers together and produce expectedOutput'
//       }])
//     })
//     .then(() => {
//       return Assignment.sync()
//         .then(() => Assignment.destroy({ where: {} }))
//         .then(() => {
//           return Assignment.bulkCreate([{
//             problemId: 1,
//             assigneeId: 2,
//             assignerId: 7,
//           },{
//             problemId: 1,
//             assigneeId: 2,
//             assignerId: 7,
//           },{
//             problemId: 1,
//             assigneeId: 3,
//             assignerId: 7,
//           },{
//             problemId: 1,
//             assigneeId: 4,
//             assignerId: 7,
//           },{  
//             problemId: 2,
//             assigneeId: 1,
//             assignerId: 7,
//           },{
//             problemId: 2,
//             assigneeId: 2,
//             assignerId: 7,
//           },{
//             problemId: 2,
//             assigneeId: 3,
//             assignerId: 7,
//           },{
//             problemId: 3,
//             assigneeId: 1,
//             assignerId: 7,
//           },{
//             problemId: 3,
//             assigneeId: 2,
//             assignerId: 7,
//           },{
//             problemId: 3,
//             assigneeId: 3,
//             assignerId: 7,
//           },{
//             problemId: 3,
//             assigneeId: 4,
//             assignerId: 7,
//           },{
//             problemId: 3,
//             assigneeId: 5,
//             assignerId: 7,
//           }
//           ])
//         })
//     })
//     .then(() => {
//       DataSet.sync()
//         .then(() => DataSet.destroy({ where: {} }))
//         .then(() => {
//           DataSet.bulkCreate([{
//             inputs: "2 3",
//             expectedOutput: "5",
//             problemId: 1
//           },{
//             inputs: "1 2",
//             expectedOutput: "3",
//             problemId: 1
//           },{
//             inputs: "2 3",
//             expectedOutput: "5",
//             problemId: 1,
//             isHidden: false

//           },{
//             inputs: "1 2",
//             expectedOutput: "3",
//             problemId: 1,
//             isHidden: false
//           },{
//             inputs: "4 2",
//             expectedOutput: "2",
//             problemId: 2
//           },{
//             inputs: "100 2",
//             expectedOutput: "98",
//             problemId: 2
//           },{
//             inputs: "100 2",
//             expectedOutput: "200",
//             problemId: 3
//           },{
//             inputs: "50 3",
//             expectedOutput: "150",
//             problemId: 3
//           }])
//           .then(() => {
//             console.log('finished populating problems');
//           });
//         });

//       });
// }