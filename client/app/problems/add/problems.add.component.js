'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from '../problems.routes';

export class ProblemAddComponent {
  /*@ngInject*/
  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;

    this.testCases = [];
    this.description = "";
    this.language = "";
    this.title = "";
    this.functionName = "";
  }

  getStudents() {
    let self = this;
    this.$http.get('/api/users/students')
      .then(function (res) {
        self.students = res.data;
      })
  }

  addTestCase(){
    this.testCases.push({
      inputs: [{},{}],
      expectedOutput: {}
    });
  }

  submit() {
    let problem = {
      testCases: this.testCases, 
      description: this.description, 
      language: this.language,
      title: this.title,
      functionName: this.functionName,
      assignees: this.assignees
    }
    let self = this;
    this.$http.post('/api/problems', problem)
      .then(function (res) {
        self.$state.go('problems.all');
      })
  }
}

export default angular.module('cshelperApp.problems.add', [uiRouter])
  .component('problemsadd', {
    template: require('./problems.add.html'),
    controller: ProblemAddComponent,
    controllerAs: 'ProblemsAddCtrl'
  })
  .name;
