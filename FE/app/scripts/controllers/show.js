'use strict';

/**
 * @ngdoc function
 * @name feApp.controller:ShowCtrl
 * @description
 * # ShowCtrl
 * Controller of the feApp
 */
angular.module('feApp')
  .controller('ShowCtrl', ['$scope', 'ShowService', 'SelectedShowService', '$window', 'ngDialog', function (scope, showService, selectedShowService, window, ngdialog) {

    scope.selectedShow = selectedShowService.getShow();
    scope.episodeList = selectedShowService.getShowList();
    console.log(scope.episodeList);

    scope.save = function(imdbId, selectedShow) {
      showService.update(imdbId, selectedShow);
      window.location.href = '/#/shows';
    };

    scope.remove = function(imdbId) {
      showService.remove(imdbId).then(function(response) {
        console.log(response.status);
        ngdialog.open({
          template: response.data,
          plain: true
        });
        if (response.status == 200) {
          window.location.href = '/#/shows';
        }
      });

    };

    scope.syncOMDBAPI = function(imdbId) {
      showService.getFromOMDBAPI(imdbId).then(function (omdbAPIObject) {
          selectedShowService.setOmdbAPIObject(omdbAPIObject);
          scope.OMDBAPIObject = omdbAPIObject;

          //Add it to the Express API
          showService.syncWithOMDBAPI(imdbId, omdbAPIObject).then(function(response) {
            ngdialog.open({
              template: response,
              plain: true
            });
          });
        }
      );
    };

    scope.openEpisode = function(imdbId, seasonNum, episodeNum) {
      showService.getEpisode(imdbId, seasonNum, episodeNum).then(function(d) {
        selectedShowService.setEpisode(d);
        window.location.href = '/#/episode';
      })
    };
  }]);
