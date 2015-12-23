'use strict';

describe('Service: PlannerPortalService', function () {

  // load the service's module
  beforeEach(module('indiaworksMainSiteApp'));

  // instantiate service
  var PlannerPortalService;
  beforeEach(inject(function (_PlannerPortalService_) {
    PlannerPortalService = _PlannerPortalService_;
  }));

  it('should do something', function () {
    expect(!!PlannerPortalService).toBe(true);
  });

});
