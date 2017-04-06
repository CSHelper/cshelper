'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('teacher', {
      url: '/teacher',
      template: '<teacher></teacher>',
      authenticate: 'student'
    })
    // .state('teacher.classStatistics', {
    //   url: '/classStatistics',
    //   template: '<class-statistics></class-statistics>'
    // })
    .state('teacher.attempts', {
      url: '/attempts?:id',
      template: '<attempts></attempts>'
    })
    .state('teacher.studentStatistics', {
      url: '/studentStatistics?:id',
      template: '<stats></stats>'
    });
}
