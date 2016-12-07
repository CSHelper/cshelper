'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './problemCreation.routes';

export class ProblemCreationComponent {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.testCases = [];
    this.description = "";
    this.language = "";
    this.title = "";
    this.functionName = "";
  }

  addTestCase(){
    this.testCases.push({
      inputs: [{},{}],
      expectedOutput: {}
    });
  }

  submit(){
    let problem = {testCases: this.testCases, 
                  description: this.description, 
                  language: this.language,
                  title: this.title,
                  functionName: this.functionName
                }
    let self = this;
    this.$http.post('/api/problems', problem)
    .then(function (res) {
      console.log(res)
    })
  }
}

export default angular.module('cshelperApp.problemCreation', [uiRouter])
  .config(routes)
  .component('problemCreation', {
    template: require('./problemCreation.html'),
    controller: ProblemCreationComponent,
    controllerAs: 'problemCreationCtrl'
  })
  .name;
