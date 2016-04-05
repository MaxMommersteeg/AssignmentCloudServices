'use strict';

/**
 * @ngdoc service
 * @name feApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Factory in the feApp.
 */
angular.module('feApp')
  .factory('AuthenticationService', function () {
    var auth = {
      isLogged: false
    };

    return auth;
  });
