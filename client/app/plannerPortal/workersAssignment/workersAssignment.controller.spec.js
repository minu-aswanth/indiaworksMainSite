'use strict';

describe('Controller: WorkersAssignmentCtrl', function () {

  // load the controller's module
  beforeEach(module('indiaworksMainSiteApp'));

  var WorkersAssignmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkersAssignmentCtrl = $controller('WorkersAssignmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
