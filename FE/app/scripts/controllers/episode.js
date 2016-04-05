'use strict';

/**
 * @ngdoc function
 * @name feApp.controller:EpisodeCtrl
 * @description
 * # EpisodeCtrl
 * Controller of the feApp
 */
angular.module('feApp')
  .controller('EpisodeCtrl', ['$scope', 'SelectedShowService', function (scope, selectedShowService) {
      scope.selectedEpisode = selectedShowService.getEpisode();

      function convertTimeStampToDate(timeStamp) {
        var date = new Date(timeStamp*1000);
        return date;
      }

      scope.airDate = convertTimeStampToDate(selectedShowService.getEpisode().first_aired);
  }]);
