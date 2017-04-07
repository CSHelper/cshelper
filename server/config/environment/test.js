'use strict';
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/firstpresentation-test'
  },
  sequelize: {
    uri: process.env.SEQUELIZE_URI
      || 'mysql://localhost:3306/test',
    username: 'newuser',
    password: 'cshelper',
    options: {
      logging: false
    }
  }
};
