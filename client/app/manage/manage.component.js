'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './manage.routes';

export class ManageComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('cshelperApp.manage', [uiRouter])
  .config(routes)
  .component('manage', {
    template: require('./manage.html'),
    controller: ManageComponent,
    controllerAs: 'manageCtrl'
  })
  .name;
