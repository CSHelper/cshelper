'use strict';

describe('Component: ProblemCreationComponent', function() {
  // load the controller's module
  beforeEach(module('cshelperApp.problemCreation'));

  var ProblemCreationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ProblemCreationComponent = $componentController('problemCreation', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
