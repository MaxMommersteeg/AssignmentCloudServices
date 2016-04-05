'use strict';

/**
 * @ngdoc function
 * @name feApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the feApp
 */
angular.module('feApp')
  .controller('RegisterCtrl', ['$scope', 'UserService', '$location', function (scope, userservice, location) {
    scope.user = {};
    scope.signUp = function signUp(user) {
      console.log(user.password_confirm);
      if(user.password === user.password_confirm) {
        userservice.signUp(user.username, user.password).then(location.path("#/login"));
      }
      else {
        console.log("Wrong combination");
      }
    };
  }]);
