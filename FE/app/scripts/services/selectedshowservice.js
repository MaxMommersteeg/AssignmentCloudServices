'use strict';

/**
 * @ngdoc service
 * @name feApp.SelectedShowService
 * @description
 * # SelectedShowService
 * Service in the feApp.
 */
angular.module('feApp')
  .service('SelectedShowService', function () {
    var _show = null;
    var _episode = null;
    var _omdbAPIObject = null;
    var _showList = null;

    this.getShow = function() {
      return _show;
    };

    this.setShow = function(show) {
      _show = show;
    };

    this.getOmdbAPIObject = function() {
      return _omdbAPIObject;
    };

    this.setOmdbAPIObject = function(omdbAPIObject) {
      _omdbAPIObject = omdbAPIObject;
    };

    this.getShowList = function() {
      return _showList;
    };

    this.setShowList = function(showList) {
      _showList = showList;
    };

    this.getEpisode = function() {
      return _episode;
    };

    this.setEpisode = function(episode) {
      _episode = episode;
    };

  });
