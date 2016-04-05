'use strict';

/**
 * @ngdoc overview
 * @name feApp
 * @description
 * # feApp
 *
 * Main module of the application.
 */
angular
  .module('feApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngDialog',
    'angularUtils.directives.dirPagination'
  ])
  //.config(function ($httpProvider) {
  //  $httpProvider.interceptors.push('TokenInterceptor');
  //})
  .config(['$routeProvider', function (routeProvider) {
    routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        data: { requiredLogin: false }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        data: { requiredLogin: false }
      })
      .when('/shows', {
        templateUrl: 'views/shows.html',
        controller: 'ShowsCtrl',
        controllerAs: 'shows',
        data: { requiredLogin: false }
      })
      .when('/show', {
        templateUrl: 'views/show.html',
        controller: 'ShowCtrl',
        controllerAs: 'show',
        data: { requiredLogin: false }
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        data: { requiredLogin: false }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/docs', {
        templateUrl: 'views/docs.html',
        controller: 'DocsCtrl',
        controllerAs: 'docs'
      })
      .when('/episode', {
        templateUrl: 'views/episode.html',
        controller: 'EpisodeCtrl',
        controllerAs: 'episode'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(function($rootScope, $location, AuthenticationService) {

      $rootScope.$on("$routeChangeStart", function(event, next, current) {
      if(!next.$$route) {
      var routeData = next.$$route;
      if (routeData.data.requiredLogin && !AuthenticationService.isLogged) {
        $location.path("/user");
      }
        }
  });

});

