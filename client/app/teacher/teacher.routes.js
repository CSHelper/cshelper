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
      url: '/classStatistics?userId',
      template: '<class></class>'
    })
    .state('teacher.attempts', {
      url: '/attempts?:userId',
      template: '<attempts></attempts>'
    })
    .state('teacher.studentStatistics', {
      url: '/studentStatistics?:userId',
      template: '<stats></stats>'
    });
}
