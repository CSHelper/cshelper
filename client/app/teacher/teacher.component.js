'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './teacher.routes';

export class TeacherComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cshelperApp.teacher', [uiRouter])
  .config(routes)
  .component('teacher', {
    template: require('./teacher.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .name;
