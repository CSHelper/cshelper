'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './main.routes';

export class MainComponent {
  /*@ngInject*/
  constructor(Auth) {
    'ngInject';

    this.getCurrentUser = Auth.getCurrentUserSync;
    this.Auth = Auth;
  }
}

export default angular.module('firstPresentationApp.main', [uiRouter])
  .config(routes)
  .component('main', {
    template: require('./main.html'),
    controller: MainComponent,
    controllerAs: 'mainCtrl'
  })
  .name;
