'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('teacher', {
      url: '/teacher',
      template: '<teacher></teacher>',
      authenticate: 'student'
    })
    .state('teacher.classStatistics', {
      url: '/classStatistics?id',
      template: '<class></class>'
    })
    .state('teacher.attempts', {
      url: '/attempts?:id',
      template: '<attempts></attempts>'
    })
    .state('teacher.studentStatistics', {
      url: '/studentStatistics?:id',
      template: '<stats></stats>'
    });
}
