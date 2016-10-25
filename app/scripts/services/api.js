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
        var self = this;
        // NOTE NOTE Important
        //var nwlink = './api/';
        var nwlink = 'http://localhost:80/lsamap/app/api/';

        // example function
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

        this.pwd = "";

        // the currentMap needs to be binded to the scope (I guess)
        // 2 types of maps I suppose?
        this.currentMap = 0;

        this.xzy = false;


        // This one gets called from the controller api call to update the service just before rendering the map directive
        this.setSerGemeenten = function(serser) {
            //this.sergemeenten =
            // WORKS
            self.serGemeenten = serser;
            console.log(self.serGemeenten);
        };








        // NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE
        // NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE
        // Here are the API CALLS - Change ´nwlink' when needed

        //var nwlink = 'http://localhost:80/chaletrenesse/app/api/';


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
                //console.log(data);

                //console.log(data);
            });
        };




        // authenticatin' NOTE NOTE // works // store password in variable
        this.getIpa = function() {
            // $http() returns a $promise that we can add handlers with .then()
            return this.myPromise = $http({
                method: "post",
                url: nwlink + 'ipa.php',
                data: {
                    wwww: self.pwd,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            /* Check whether the HTTP Request is Successfull or not. */

        };

    });
