'use strict';

describe('Controller: TicketDetailsCreationCtrl', function () {

  // load the controller's module
  beforeEach(module('indiaworksMainSiteApp'));

  var TicketDetailsCreationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TicketDetailsCreationCtrl = $controller('TicketDetailsCreationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
