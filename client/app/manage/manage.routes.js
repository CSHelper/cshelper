'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('manage', {
      url: '/manage',
      template: '<manage></manage>'
    });
}
