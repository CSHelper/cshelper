'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('problems', {
      url: '/problems',
      template: '<problems></problems>',
      authenticate: 'student'
    })
    .state('problems.add', {
      url: '/add',
      template: '<problemsadd></problemsadd>'
    })
    .state('problems.all', {
      url: '/all',
      template: '<problemsall></problemsall>'
    })
    .state('problems.id', {
      url: '/:id',
      template: '<problemsid></problemsid>'
    });
}
