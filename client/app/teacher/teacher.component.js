'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './teacher.routes';

export class TeacherComponent {
  /*@ngInject*/
  constructor($http) {
    'ngInject';

    this.$http = $http;

    this.initTutor();
  }

  initTutor() {
    var self = this;
    this.$http.get('/api/users/students')
      .then(function (res) {
        self.students = res.data;
      });
  }

  initStatistic() {
    this.loadStatistics();
    this.loadCalendar();
  }

  loadStatistics() {
    let series1 = [{
      name: 'In Progress',
      data: [3, 2, 1, 1, 2, 3, 0, 0, 2, 1, 0, 1]
    }, {
      name: 'Failed',
      data: [1, 2, 2, 4, 7, 8, 9, 7, 0, 2, 5, 5]
    }, {
      name: 'Completed',
      data: [1, 2, 3, 3, 1, 0, 1, 1, 0, 0, 3, 3]
    }];

    let series2 = [{
      name: 'Problems',
      colorByPoint: true,
      data: [{
        name: 'In Progress',
        y: 60
      }, {
        name: 'Failed',
        y: 10,
        sliced: true,
        selected: true
      }, {
        name: 'Completed',
        y: 30
      }]
    }];

    loadStudentStatistics(series1, series2);
  }

  loadCalendar() {
    $('#calendar').fullCalendar({
      // put your options and callbacks here
      
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      
      events: [
        {
          title: 'Due: Variable Declarations',
          start: '2017-03-13'
        },
        {
          title: 'Due: Assignments',
          start: '2017-03-15'
        },
        {
          title: 'Due: Printing Variables',
          start: '2017-03-27'
        },
        {
          title: 'Due: Keywords',
          start: '2017-03-29'
        },
        
        
        

        {
          title: 'Lesson: Variables',
          start: '2017-03-06',
          end: '2017-03-11',
          allDay: true
        },
        {
          title: 'Lesson: Operators',
          start: '2017-03-13',
          end: '2017-03-18',
          allDay: true
        },
        {
          title: 'Lesson: Decision Making',
          start: '2017-03-27',
          end: '2017-04-01',
          allDay: true
        }
      ]
    })
  }
}

export default angular.module('cshelperApp.teacher', [uiRouter])
  .config(routes)
  .component('teacher', {
    template: require('./teacher.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .component('class-statistics', {
    template: require('./subpage/classStatistics.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .component('attempts', {
    template: require('./subpage/problemAttempts.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .component('stats', {
    template: require('./subpage/studentStatistics.html'),
    controller: TeacherComponent,
    controllerAs: 'teacherCtrl'
  })
  .name;
