'use strict';

describe('Service: SelectedShowService', function () {

  // load the service's module
  beforeEach(module('feApp'));

  // instantiate service
  var SelectedShowService;
  beforeEach(inject(function (_SelectedShowService_) {
    SelectedShowService = _SelectedShowService_;
  }));

  it('should do something', function () {
    expect(!!SelectedShowService).toBe(true);
  });

});
