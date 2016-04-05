'use strict';

/**
 * @ngdoc service
 * @name feApp.TokenInterceptor
 * @description
 * # TokenInterceptor
 * Factory in the feApp.
 */
angular.module('feApp')
  .factory('TokenInterceptor', ['$window', '$q', '$location', 'AuthenticationService', function (window, q, location, authenticationservice) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if (window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + window.sessionStorage.token;
        }
        return config;
      },

      requestError: function(rejection) {
        return q.reject(rejection);
      },

      /* Set Authentication.isAuthenticated to true if 200 received */
      response: function (response) {
        if (response !== null && response.status === 200 && window.sessionStorage.token && !authenticationservice.isAuthenticated) {
          authenticationservice.isAuthenticated = true;
        }
        return response || q.when(response);
      },

      /* Revoke client authentication if 401 is received */
      responseError: function(rejection) {
        if (rejection !== null && rejection.status === 401 && (window.sessionStorage.token || authenticationservice.isAuthenticated)) {
          delete window.sessionStorage.token;
          authenticationservice.isAuthenticated = false;
          location.path("/user/login");
        }

        return q.reject(rejection);
      }
    };
  }]);
