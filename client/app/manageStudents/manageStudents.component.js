'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './manageStudents.routes';

export class ManageStudentsComponent {
  /*@ngInject*/
  constructor($http) {
    'ngInject';
    
  }
}

export default angular.module('firstPresentationApp.manageStudents', [uiRouter])
  .config(routes)
  .component('manageStudents', {
    template: require('./manageStudents.html'),
    controller: ManageStudentsComponent,
    controllerAs: 'manageStudentsCtrl'
  })
  .name;
