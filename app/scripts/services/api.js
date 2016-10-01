'use strict';

/**
 * @ngdoc service
 * @name lsamapApp.api
 * @description
 * # api
 * Service in the lsamapApp.
 */
angular.module('lsamapApp')
  .service('apis', function($http, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getMapData = function() {
      return [{
        id: "1",
        name: "Iemand",
        color: "color1"
      }, {
        id: "2",
        name: "anders",
        color: "color2"
      }];
    };

    // A fake service for now
    this.service1 = "owheywwweye";

    // the currentMap needs to be binded to the scope (I guess)
    // 4 types of maps I suppose?
    this.currentMap = 1;

    // NOTE NOTE NOTE
    // Here are the API CALLS

    //var nwlink = 'http://localhost:80/chaletrenesse/app/api/';
    // var nwlink = './api/';
    var nwlink = 'http://localhost:80/lsamap/app/api/';

    this.getApi = function() {
      // $http() returns a $promise that we can add handlers with .then()
      return $http({
        method: 'GET',
        //TODO TODO TODO  switch onderstaande url: './api/api.php' --  ' http://localhost:8888/chaletrenesse/app/api/api.php ''
        url: nwlink + 'api.php',
        params: {
          woobar: new Date().getTime()
        },
        cache: false
      }).success(function(data, status, headers, config) {
        //console.log(data[0]);
      });
    };

    this.ipa = function() {
      // $http() returns a $promise that we can add handlers with .then()
      return $http({
        method: 'GET',
        //TODO TODO TODO  switch onderstaande url: './api/ipa.php' --  ' http://localhost:8888/chaletrenesse/app/api/ipa.php ''
        url: nwlink + 'ipa.php',
        params: {
          woobar: new Date().getTime()
        },
        cache: false
      }).success(function(data, status, headers, config) {
        //console.log(data[0]);
      });
    };
  });
