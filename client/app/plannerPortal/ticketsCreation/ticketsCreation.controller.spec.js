'use strict';

describe('Controller: TicketsCreationCtrl', function () {

  // load the controller's module
  beforeEach(module('indiaworksMainSiteApp'));

  var TicketsCreationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TicketsCreationCtrl = $controller('TicketsCreationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
