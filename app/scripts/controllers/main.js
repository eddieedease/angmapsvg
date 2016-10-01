'use strict';

/**
 * @ngdoc function
 * @name lsamapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
    .controller('MainCtrl', function($scope, $timeout, $http, $sce, $route, apis) {

        // always bind self for various (aqr) reasons
        var self = this;


        // NOTE NOTE SERVICE CALLS
        // NOTE API call
        apis.getApi().then(function(dataResponse) {
          // NOTE 3 pieces [0] gemeenten [1] instrument [2] uploads
          console.log(dataResponse);
          // TODO set everything up
          //self.currenthtml = $sce.trustAsHtml(self.sersections[0].nl);
          //self.currentitle = $sce.trustAsHtml(self.sersections[0].titlenl);
          //self.ryx();
        });



        // set up all local variables
        this.curmap = apis.currentMap;
        this.gemeenten = [];
        this.introtekst = "Click  on something!";

        $scope.testttt = Math.random();


        $scope.hoverRegion = "";

        // NOTE DIRECTIVES/ SCOPE CALLS
        // these ones get called from the gemeenten directives
        $scope.mouseoverselection = function(idid) {
            self.hovergemeente = idid;
        }

        $scope.mouseclicked = function(idid) {
            self.currentgemeente = idid;
        }

        $scope.collectGemeenten = function(gem) {
            var nieuw = {
                value: gem,
                label: gem
            }
            self.gemeenten.push(nieuw);
            // sort alphabetical
            self.gemeenten.sort(function(a, b) {
                // ascending alfabetical
                if (a.label < b.label) return -1;
                if (a.label > b.label) return 1;
            });
        }

        /*  // NOTE timeout example TODO; mayB calls this when loading
          $timeout(function() {
            console.log("timeouterrrrr");
            //var panZoomTiger = svgPanZoom('mapp');
          }, 2000);*/

        // NOTE NOTE NOTE
        // NOTE FUNCTIONS FROM SELF/CONTROLLER





        this.setMap = function(whichmap) {
            apis.currentMap = whichmap;
            // NOTE for the record, when the page view is changed, we need to reload the route
            // the service variable currentmap will force render the new colours
            $route.reload();
        }


        // this one picks up the selector change
        // gets also the new and the oldvalue-
        this.onChangeFromList = function(newValue, oldValue) {
            console.log("Hoe vaak!");

            if (newValue) {
                $scope.currentgemeente = newValue.value;
                $scope.hoverRegion = newValue.value;
                if (oldValue) {
                    $scope.hoverRegionLast = oldValue.value;
                }




                //console.log($scope.hoverRegion);
                //console.log($scope.hoverRegionLast);


            }
        }




    });
