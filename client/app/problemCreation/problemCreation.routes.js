'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('problemCreation', {
      url: '/problemCreation',
      template: '<problem-creation></problem-creation>'
    });
}
