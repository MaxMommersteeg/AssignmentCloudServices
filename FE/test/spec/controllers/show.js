'use strict';

describe('Controller: ShowCtrl', function () {

  // load the controller's module
  beforeEach(module('feApp'));

  var ShowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowCtrl = $controller('ShowCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ShowCtrl.awesomeThings.length).toBe(3);
  });
});
