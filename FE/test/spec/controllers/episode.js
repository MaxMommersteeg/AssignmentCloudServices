'use strict';

describe('Controller: EpisodeCtrl', function () {

  // load the controller's module
  beforeEach(module('feApp'));

  var EpisodeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EpisodeCtrl = $controller('EpisodeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EpisodeCtrl.awesomeThings.length).toBe(3);
  });
});
