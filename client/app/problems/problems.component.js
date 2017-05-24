'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './problems.routes';

export class ProblemsComponent {
  /*@ngInject*/
  constructor($stateParams, $timeout, $http, $state, Auth) {
    'ngInject';

    this.id = $stateParams.id;
    this.$http = $http;
    this.$timeout = $timeout;
    this.$state = $state;
    this.isAdmin = Auth.isAdminSync;

    var md = window.markdownit({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
                   hljs.highlight(lang, str, true).value +
                   '</code></pre>';
          } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    });

    this.md = md;
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
    $('#description-pannel').html(this.md.render(this.description));
    this.title = problem.title;

    let editor = this.editor;
    let self = this;
    $('#languageSelector').on('change', function(e) {
      editor.setOption('mode', $(this).val());
    })

  }

  updateIcons(tests, isSubmit) {
    let failed = false;
    for (let i = 0; i < tests.length; i++) {
      if (tests[i].isSuccess) {
        tests[i].class = 'fa-check success';
      } else {
        tests[i].class = 'fa-times fail';
        failed = true;
      }
    }

    if (isSubmit) {
      if (failed) {
        this.isSubmitSuccess = 'fa-times fail';
      } else {
        this.isSubmitSuccess = 'fa-check success';
      }
    }
  }

  run() {
    let promise = this.sendCode(false);
    if (!promise) return;

    let self = this;
    for (let i = 0; i < self.tests.length; i++) {
      self.tests[i].class = 'fa-clock-o'
    }

    if (promise) {
      promise
        .then(function (res) {
          for (let i = 0; i < res.data.tests.length; i++) {
            self.tests[i].isSuccess = res.data.tests[i].isSuccess;
            self.tests[i].output = res.data.tests[i].output;
          }
          self.updateIcons(self.tests);
        })
        .catch(function (error) {
          for (let i = 0; i < self.tests.length; i++) {
            self.tests[i].isSuccess = false;
            self.tests[i].output = error.data.error;
          }
          self.updateIcons(self.tests);
        });
    }
  }

  submit() {
    let promise = this.sendCode(true);

    if (!promise) return;

    let self = this;
    for (let i = 0; i < self.hiddenTests.length; i++) {
      self.hiddenTests[i].class = 'fa-clock-o';
    }
    this.isSubmitSuccess = 'fa-clock-o';

    if (promise) {
      promise
        .then(function (res) {
          for (let i = 0; i < res.data.tests.length; i++) {
            self.hiddenTests[i].isSuccess = res.data.tests[i].isSuccess;
            self.hiddenTests[i].output = res.data.tests[i].output;
          }
          self.updateIcons(self.hiddenTests, true);
        })
        .catch(function (error) {
          for (let i = 0; i < self.tests.length; i++) {
            self.hiddenTests[i].isSuccess = false;
            self.hiddenTests[i].output = error.data.error;
          }
          self.updateIcons(self.hiddenTests, true);
        });
    }
  }

  sendCode(isSubmit) {
    let self = this;
    
    let data = {
      problemId: this.id,
      content: this.editor.getValue(), 
      language: $('#languageSelector').find('option:selected').text().toLowerCase(),
      isSubmit
    }

    if(this.editor.getValue()) {
      self.isProcessing = true;
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
