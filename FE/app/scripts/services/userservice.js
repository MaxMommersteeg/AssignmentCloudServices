'use strict';

/**
 * @ngdoc service
 * @name feApp.UserService
 * @description
 * # UserService
 * Factory in the feApp.
 */
angular.module('feApp')
  .factory('UserService', ['$http', function (http) {
    return {
      logIn: function(username, password) {
        return http.post('http://localhost:3000/user/authenticate', {username: username, password: password});
      },
      logOut: function() {

      },
      signUp: function(username, password) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = http.post('http://localhost:3000/user/signup', { username: username, password: password}).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };
  }]);
