'use strict';

/**
 * @ngdoc function
 * @name feApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the feApp
 */
angular.module('feApp')
  .controller('UserCtrl', ['$scope', '$window', '$location', 'UserService', 'AuthenticationService', function (scope, window, location, UserService, AuthenticationService) {
    scope.loggedIn = AuthenticationService.isLogged;
    scope.logIn = function logIn(username, password) {
      if (username !== undefined && password !== undefined) {
        UserService.logIn(username, password).success(function(data) {
          AuthenticationService.isLogged = true;
          window.sessionStorage.token = data.token;
          location.path("/shows");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
      }
    };

    scope.logOut = function logOut() {
      if (AuthenticationService.isLogged) {
        AuthenticationService.isLogged = false;
        delete window.sessionStorage.token;
        location.path("/");
      }
    };

    scope.signUp = function signUp() {
      location.path("/register");
    };

  }]);
