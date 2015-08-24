'use strict';

describe('Controller: PollCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var PollCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PollCtrl = $controller('PollCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
