'use strict';

/**
 * @ngdoc service
 * @name feApp.ShowService
 * @description
 * # ShowService
 * Service in the feApp.
 */
angular.module('feApp')
  .factory('ShowService', function ($http) {
    var showService = {
      getShows: function(itemsPerPage, pageNo) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('http://localhost:3000/shows/paginate/' + itemsPerPage + '/' + pageNo).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      },
      getShow: function(imdbId) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('http://localhost:3000/shows/' + imdbId).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      },
      getEpisodesOfShow: function(imdbId) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('http://localhost:3000/shows/' + imdbId + '/episodes').then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      },
      update: function(imdbId, show) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.put('http://localhost:3000/shows/' + imdbId, show).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response;
        });
        // Return the promise to the controller
        return promise;
      },
      remove: function(imdbId) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.delete('http://localhost:3000/shows/' + imdbId).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response;
        });
        // Return the promise to the controller
        return promise;
      },
      getFromOMDBAPI: function(imdbId) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('http://www.omdbapi.js.com/?i=' + imdbId).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      },
      syncWithOMDBAPI: function(imdbId, omdbapi) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.put('http://localhost:3000/omdbapi.js/' + imdbId, omdbapi).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      },
      getEpisode: function(imdbId, seasonNum, episodeNum) {
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get('http://localhost:3000/shows/' + imdbId + '/episode', { params: { season: seasonNum, episode: episodeNum } }).then(function (response) {
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
        // Return the promise to the controller
        return promise;
      }
    };
    return showService;
});
