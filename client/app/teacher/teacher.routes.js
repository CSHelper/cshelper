'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('teacher', {
      url: '/teacher',
      template: '<teacher></teacher>',
      authenticate: 'tutor'
    });
}
