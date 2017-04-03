'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './problems.routes';

export class ProblemsComponent {
  /*@ngInject*/
  constructor($stateParams, $timeout, $http, $state) {
    'ngInject';

    this.id = $stateParams.id;
    this.$http = $http;
    this.$timeout = $timeout;
    this.$state = $state;
  }

  getAll() {
    let self = this;
    this.$http.get('/api/problems')
      .then(function(res) {
        let assignmentGroup = {};
        self.problems = res.data.problems;
        let assignments = res.data.assignments;
        
        for (let i = 0; i < assignments.length; i++) {
          if (assignmentGroup[assignments[i].problemId]) {
            assignmentGroup[assignments[i].problemId].push(assignments[i]);
          } else {
            assignmentGroup[assignments[i].problemId] = [assignments[i]];
          }
        }

        for (let key in assignmentGroup) {
          for (let i = 0; i < self.problems.length; i++) {
            if (self.problems[i]._id == key) {
              self.problems[i].assignTo = assignmentGroup[key];
            }
          }
        }
      })
  }

  init() {
    this.editors = [];
    this.response;
    this.tab = 'console';

    let self = this;
    this.$http.get('/api/problems/' + this.id)
      .then(function(res) {
        if (!res.data.problem) {
          self.$state.go('main');
          return;
        }

        self.setup(res.data.problem, res.data.tests, res.data.numHiddenTests);
      });
  }

  setup(problem, tests, numHiddenTests) {
    this.hiddenTests = [];
    for (let i = 0; i < numHiddenTests; i++) {
      this.hiddenTests.push({});
    }

    this.problem = problem;
    this.tests = tests;
    this.editor = (this.createCodeMirror('code-editor'));
    this.editor.setOption('mode', 'text/x-csrc');
    this.description = problem.description;
    this.title = problem.title;

    // this.output = this.createCodeMirror('code-output', {
    //   readOnly: 'nocursor',
    //   showCursorWhenSelecting: false
    // })

    let editor = this.editor;
    let self = this;
    $('#languageSelector').on('change', function(e) {
      console.log($(this).val());
      editor.setOption('mode', $(this).val());
    })

  }

  updateIcons(tests) {
    for (let i = 0; i < tests.length; i++) {
      if (tests[i].isSuccess) {
        tests[i].class = 'fa-check success';
      } else {
        tests[i].class = 'fa-times fail';
      }
    }
  }

  run() {
    let self = this;
    for (let i = 0; i < self.hiddenTests.length; i++) {
      self.tests[i].class = 'fa-clock-o'
    }
    let promise = this.sendCode('r');

    if (promise) {
      promise
        .then(function (res) {
          console.log(res);
          for (let i = 0; i < res.data.tests.length; i++) {
            self.tests[i].isSuccess = res.data.tests[i].isSuccess;
            self.tests[i].output = res.data.tests[i].output;
          }
          self.updateIcons(self.tests);
        })
        .catch(function (error) {
          console.log(error);
          for (let i = 0; i < self.tests.length; i++) {
            self.tests[i].isSuccess = false;
            self.tests[i].output = error.data.error;
          }
          self.updateIcons(self.tests);
        });
    }
  }

  submit() {
    let self = this;
    for (let i = 0; i < self.hiddenTests.length; i++) {
      self.hiddenTests[i].class = 'fa-clock-o'
    }

    let promise = this.sendCode('s');

    if (promise) {
      promise.then(function (res) {
        for (let i = 0; i < res.data.tests.length; i++) {
          self.hiddenTests[i].isSuccess = res.data.tests[i].isSuccess;

          if (self.hiddenTests[i].isSuccess) {
            self.hiddenTests[i].class = 'fa-check success';
          } else {
            self.hiddenTests[i].class = 'fa-times fail';
          }
        }
      });
    }
  }

  sendCode(type) {
    let self = this;
    self.isProcessing = true;

    let data = {
      problemId: this.id,
      content: this.editor.getValue(), 
      language: $('#languageSelector').find('option:selected').text().toLowerCase(),
      type
    }

    if(this.editor.getValue()) {
      return this.$http.post('/api/codes', data)
        .then(function(res) {
          self.isProcessing = false;
          return res;
        })
        .catch(function (error) {
          self.isProcessing = false;

          return new Promise(function (_, reject) {
            reject(error);
          })
        })
    }
  }

  displayConsole() {
    if (this.tab === 'console')
      this.output.getDoc().setValue(this.response.consoleOutput);
  }

  createCodeMirror(id, options) {
    options = options || {};

    let defaultOptions = {
      lineNumbers: true,
      matchBrackets: true,
      lineWrapping: true,
      scrollbarStyle: 'native',
      lineWrapping: true,
      theme: 'icecoder',
      extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'},
      mode: 'text/x-c++src',
    }

    for (let key in options) {
      defaultOptions[key] = options[key];
    }

    return CodeMirror.fromTextArea(document.getElementById(id), defaultOptions, { showToolbar: true })
  }

}

export default angular.module('firstPresentationApp.problems', [uiRouter])
  .config(routes)
  .component('problems', {
    template: require('./problems.html'),
    controller: ProblemsComponent,
    controllerAs: 'problemsCtrl'
  })
  .component('problemsid', {
    template: require('./id/problems.id.html'),
    controller: ProblemsComponent,
    controllerAs: 'problemsCtrl'
  })
  .component('problemsall', {
    template: require('./all/problems.all.html'),
    controller: ProblemsComponent,
    controllerAs: 'problemsCtrl'
  })
  .name;
