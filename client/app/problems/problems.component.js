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
      .then(function (res) {
        let assignmentGroup = {};
        self.problems = res.data.problems;
        let assignments = res.data.assignments;
        
        for (var i = 0; i < assignments.length; i++) {
          if (assignmentGroup[assignments[i].problemId]) {
            assignmentGroup[assignments[i].problemId].push(assignments[i]);
          } else {
            assignmentGroup[assignments[i].problemId] = [assignments[i]];
          }
        }

        for (let key in assignmentGroup) {
          for (var i = 0; i < self.problems.length; i++) {
            if (self.problems[i]._id == key) {
              self.problems[i].assignTo = assignmentGroup[key];
            }
          }
        }
        console.log(assignmentGroup);
        console.log(self.problems);
      })
  }

  init() {
    this.editors = [];
    this.response;
    this.tab = 'console';

    let self = this;
    this.$http.get('/api/problems/' + this.id)
      .then(function (res) {
        console.log(res.data.problem);
        if (!res.data.problem) {
          self.$state.go('main');
          return;
        }
        self.setup(res.data.problem, res.data.dataset);
        self.displayTests();
      });
  }

  setup(problem, dataset) {
    this.problem = problem;
    this.dataset = dataset;

    this.editor = (this.createCodeMirror('code-editor'));
    this.editor.setOption('mode', 'text/x-' + problem.language + 'src');
    this.description = problem.description;
    this.title = problem.title;

    this.output = this.createCodeMirror('code-output', {
      readOnly: 'nocursor',
      showCursorWhenSelecting: false
    })

    var editor = this.editor;
    var self1 = this;
    $('#languageSelector').on('change', function (e) {
      editor.setOption('mode', $(this).val());
      editor.getDoc().setValue(self1.fillEditor($(this).val()));
    })

  }

  run() {
    
  }

  submit() {
    var self = this;
    self.isProcessing = true;

    let data = {
      code:{
        id: this.id,
        content: this.editor.getValue(), 
        fileExtension: "c"
      }
    }

    if(this.editor.getValue()) {
      console.log(data)
      this.$http.post('/api/codes', data)
        .then(function (res) {
          self.isProcessing = false;
          self.response = res.data;
          console.log(res.data)
          for (var i = 0; i < self.response.length; i++) {
            for (var key in self.response[i]) {
              self.dataset[i][key] = self.response[i][key];
            }
            if (self.dataset[i].isSuccess) {
              self.dataset[i].class = 'list-group-item-success'
            } else {
              self.dataset[i].class = 'list-group-item-danger';
            }
          }
        })
        .catch(function (error) {
          self.isProcessing = false;
          console.log(error);
        })
    }
  }

  displayConsole() {
    if (this.tab === 'console')
      this.output.getDoc().setValue(this.response.consoleOutput);
  }

  displayTests() {
    console.log(this.dataset);
  }

  createCodeMirror(id, options) {
    options = options || {};

    var defaultOptions = {
      lineNumbers: true,
      matchBrackets: true,
      lineWrapping: true,
      scrollbarStyle: 'native',
      lineWrapping: true,
      theme: 'icecoder',
      extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'},
      mode: 'text/x-c++src',
    }

    for (var key in options) {
      defaultOptions[key] = options[key];
    }

    return CodeMirror.fromTextArea(document.getElementById(id), defaultOptions, { showToolbar: true })
  }

  fillEditor(language) {
    switch (language) {
      case 'text/x-csrc':
        return this.cHello();
        break;
      case 'text/x-c++src':
        return this.cppHello();
        break;
      case 'text/x-java':
        return this.javaHello();
        break;
    }
  }

  cHello() {
    return '/* Hello World program */\n\n'+
      '#include<stdio.h>\n\n'+
      'main()\n'+
      '{\n\tprintf("Hello World");\n}\n'
  }

  javaHello() {
    return '/* Hello World program */\n\n' +
      'public class HelloWorld {\n' +
        '\tpublic static void main(String[] args) {\n' +
            '\t\t// Prints "Hello, World" to the terminal window.\n' +
            '\t\tSystem.out.println("Hello, World");\n' +
        '\t}\n' +
    '}\n'

  }

  cppHello() {
    return '/* Hello World program */\n\n'+
    '#include <iostream.h>\n' +
    'main()\n' +
    '{\n' +
        '\tcout << "Hello World!";\n' +
        '\treturn 0;\n' +
    '}\n'
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
