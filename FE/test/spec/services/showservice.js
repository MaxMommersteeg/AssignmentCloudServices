'use strict';

describe('Service: ShowService', function () {

  // load the service's module
  beforeEach(module('feApp'));

  // instantiate service
  var ShowService;
  beforeEach(inject(function (_ShowService_) {
    ShowService = _ShowService_;
  }));

  it('should do something', function () {
    expect(!!ShowService).toBe(true);
  });

});
