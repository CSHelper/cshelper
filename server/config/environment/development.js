'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: process.env.SEQUELIZE_URI
      || 'dev',
    username: 'newuser',
    password: 'cshelper',
    options: {
      logging: false
    }
  },

  // Seed database on startup
  seedDB: true

};
