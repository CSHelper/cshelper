'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');



export class ProblemAddComponent {
  /*@ngInject*/
  constructor($http, $state,toastr) {
    this.$http = $http;
    this.$state = $state;
    this.toastr = toastr;

    this.problem = {
      description: '',
      language: '',
      title: '',
      testCases: [],
      assignees: [],
      dueDate: undefined
    }
    this.addTestCase();
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
    this.problem.testCases.push({
      isHidden: true,
      inputs: '',
      expectedOutput: ''
    });
  }

  deleteTest(index) {
    this.problem.testCases.splice(index, 1);
  }

  submit() {
    let isHidden = false;
    for (var i = 0; i < this.problem.testCases.length; i++) {
      if (this.problem.testCases[i].isHidden) {
        isHidden = true;
        break;
      }
    }

    if (!isHidden) {
      this.toastr.error('Problem must have at least 1 hidden test case.', 'Error');
      return;
    }

    let self = this;
    this.$http.post('/api/problems', this.problem)
      .then(function(res) {
        self.$state.go('problems.all');
        self.toastr.success('Problem created', 'Success');
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
