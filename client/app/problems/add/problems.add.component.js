'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');



export class ProblemAddComponent {
  /*@ngInject*/
  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
    this.testCases = [];
    this.addTestCase();
    this.description = '';
    this.language = '';
    this.title = '';
    this.functionName = '';
    this.getStudents();
  }

  getStudents() {
    let self = this;
    this.$http.get('/api/users/students')
      .then(function(res) {
        self.students = res.data;
        console.log(self.students);
      });
  }

  addTestCase() {
    this.testCases.push({
      isHidden: true,
      inputs: '',
      expectedOutput: ''
    });
  }

  deleteTest(index) {
    this.testCases.splice(index, 1);
  }

  submit() {
    let problem = {
      testCases: this.testCases,
      description: this.description,
      title: this.title,
      assignees: this.assignees,
      dueDate: this.dueDate ? (new Date(this.dueDate)).toISOString().substring(0, 19).replace('T', ' ') : undefined
    };
    // console.log(problem);
    let self = this;
    this.$http.post('/api/problems', problem)
      .then(function(res) {
        self.$state.go('problems.all');
      });
  }
}

export default angular.module('cshelperApp.problems.add', [uiRouter])
  .component('problemsadd', {
    template: require('./problems.add.html'),
    controller: ProblemAddComponent,
    controllerAs: 'ProblemsAddCtrl'
  })
  .name;
