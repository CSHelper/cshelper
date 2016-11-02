'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './problems.routes';

export class ProblemsComponent {
  /*@ngInject*/
  constructor($stateParams, $timeout, $http) {
    'ngInject';

    if (!$stateParams.language || !$stateParams.lesson) {
      console.log("hi")
    }
    this.id = $stateParams.id;
    this.$http = $http;
    this.$timeout = $timeout;
    this.editors = [];
    var self = this;
    this.$http.get('/api/problems/' + this.id)
    .then(function (res) {
      self.init(res.data);
      console.log(res)
    });

  }

  init(res) {
    console.log(res)
    this.editor = (this.createCodeMirror('code-editor'));
    this.editor.getDoc().setValue(res.template);
    this.editor.setOption("mode", 'text/x-'+res.language+'src');
    this.description = res.description;
    this.title = res.title;

    this.output = this.createCodeMirror('code-output', {
      readOnly: 'nocursor',
      showCursorWhenSelecting: false
    })

    var editor = this.editor;
    var self1 = this;
    $('#languageSelector').on('change', function (e) {
      editor.setOption("mode", $(this).val());
      editor.getDoc().setValue(self1.fillEditor($(this).val()));
    })

  }

  run() {
    var self = this;
    self.isProcessing = true;
    /*this.$timeout(function () {
      self.isProcessing = false;
      self.output.getDoc().setValue('Hello World');
    }, 3000)*/
    if(this.editor.getValue()) {
      this.$http.post('/api/codes', {
        code: 
        {
          content: this.editor.getValue(), fileExtension: "c"
        }
      })
      .then(function (res) {
        self.response = res.data.stdout;
        self.error = res.data.stderr;
        console.log(res)
        self.output.getDoc().setValue(res.data.output)
      });
    }
  }

  submit() {
    this.run();
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
  .name;
