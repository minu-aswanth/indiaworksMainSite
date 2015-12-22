'use strict';

describe('Service: plannerPortal', function () {

  // load the service's module
  beforeEach(module('indiaworksMainSiteApp'));

  // instantiate service
  var plannerPortal;
  beforeEach(inject(function (_plannerPortal_) {
    plannerPortal = _plannerPortal_;
  }));

  it('should do something', function () {
    expect(!!plannerPortal).toBe(true);
  });

});
