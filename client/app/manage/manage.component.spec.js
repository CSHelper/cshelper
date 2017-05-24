'use strict';

describe('Component: ManageComponent', function() {
  // load the controller's module
  beforeEach(module('cshelperApp.manage'));

  var ManageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ManageComponent = $componentController('manage', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
