/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

const sequelizeOpts = config.sequelize;

var db = {
  Sequelize,
  sequelize: new Sequelize(sequelizeOpts.uri, sequelizeOpts.username, sequelizeOpts.password, sequelizeOpts.options)
};

// Insert models below
db.ProblemAttempts = db.sequelize.import('../api/statistics/problemAttempts.model');
db.Statistics = db.sequelize.import('../api/statistics/statistics.model');
db.TutorStudent = db.sequelize.import('../api/tutorStudent/tutorStudent.model');
db.TutorView = db.sequelize.import('../api/tutorStudent/tutorView.model');
db.Dataset = db.sequelize.import('../api/dataset/dataset.model');
db.Problem = db.sequelize.import('../api/problem/problem.model');
db.Assignment = db.sequelize.import('../api/problem/assignment.model');
db.AssignmentDetail = db.sequelize.import('../api/problem/assignment.detail.model');
db.Code = db.sequelize.import('../api/code/code.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');
db.TestView = db.sequelize.import('../api/code/testView.model');
db.UserCodeView = db.sequelize.import('../api/code/userCodeView.model');

db.Dataset.belongsTo(db.Problem, {foreignKey: 'problemId', targetKey: '_id'});

db.Code.belongsTo(db.User, {foreignKey: 'userId', targetKey: '_id'}); 
db.Code.belongsTo(db.Problem, {foreignKey: 'problemId', targetKey: '_id'}); 

db.TutorStudent.belongsTo(db.User, {foreignKey: 'tutorId', targetKey: '_id'}); 
db.TutorStudent.belongsTo(db.User, {foreignKey: 'studentId', targetKey: '_id'});

db.Assignment.belongsTo(db.User, {foreignKey: 'assigneeId', targetKey: '_id'}); 
db.Assignment.belongsTo(db.User, {foreignKey: 'assignerId', targetKey: '_id'});
db.Assignment.belongsTo(db.Problem, {foreignKey: 'problemId', targetKey: '_id'});


module.exports = db;
