'use strict';

/**
 * @ngdoc function
 * @name feApp.controller:ShowCtrl
 * @description
 * # ShowCtrl
 * Controller of the feApp
 */
angular.module('feApp')
  .controller('ShowsCtrl', ['$scope', 'ShowService', 'SelectedShowService', '$window', function (scope, showService, selectedShowService, window) {
    scope.showsList = [];
    scope.pageNo = 1;
    scope.totalCount = 0;
    scope.pageSize = 50;

    scope.getShows = function(pageno) {
      //Clear previous data
      scope.showsList = [];
      showService.getShows(scope.pageSize, pageno).then(function(d) {
        scope.showsList = d;
        scope.totalCount = 1429;
      });
    };

    // initial data page
    scope.getShows(scope.pageNo);

    scope.sort = function(keyname) {
      scope.sortKey = keyname;
      scope.reverse = !scope.reverse;
    };

    function getEpisodes(imdbId) {
      showService.getEpisodesOfShow(imdbId).then(function(showList) {
        console.log(showList);
        selectedShowService.setShowList(showList.episodes);
        window.location.href = '/#/show';
      });
    }

    scope.openShow = function(imdbId) {
      showService.getShow(imdbId).then(function(d) {
        selectedShowService.setShow(d);
      }).then(getEpisodes(imdbId));
    };

  }]);
