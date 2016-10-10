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

        this.current = 0;
        this.max = 410;


        this.loadingnow = true;

        this.loadingtext = "Laden..";


        // fill images
        this.images = [{
            title: 'Coole titel',
            thumbUrl: 'images/castle1.jpg',
            url: 'images/castle1.jpg',
        }, {
          title: 'Check het uit',
            url: 'images/castle2.jpg'
        }, {
          title: 'Owyey',
            thumbUrl: 'images/castle3.jpeg',
            url: 'images/castle3.jpeg'
        }];




        // NOTE NOTE SERVICE CALLS
        // NOTE API call
        apis.getApi().then(function(dataResponse) {
            // NOTE 3 pieces [0] gemeenten [1] instrument [2] uploads

            apis.setSerGemeenten(dataResponse.data[0]);
            self.apiResp = dataResponse.data[0];
            //self.apiResp = "chck";

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
            self.hovergemeente = "Muis over:  " + idid;
        }



        $scope.mouseremoveselection = function(idid) {
            self.hovergemeente = "";
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


            // write to the loader - but thus kinda doens't work
            self.current = self.current + 1;
            //console.log(self.current);

            if (self.current === 401) {
                self.loadingnow = false;
                self.current = 1;
            }
        }

        /*  // NOTE timeout example TODO; mayB calls this when loading
          $timeout(function() {
            console.log("timeouterrrrr");
            //var panZoomTiger = svgPanZoom('mapp');
          }, 2000);*/

        // NOTE NOTE NOTE
        // NOTE FUNCTIONS FROM SELF/CONTROLLER





        this.setMap = function(whichmap) {

            var thismap = parseInt(whichmap)

            console.log(typeof thismap);
            apis.currentMap = thismap;
            //self.loadingnow = true;
            // NOTE for the record, when the page view is changed, we need to reload the route
            // the service variable currentmap will force render the new colours
            this.loadingnow = true;

            $timeout(self.reloadroute, 500);


            //self.loadingnow = false;
        }

        this.reloadroute = function() {
            $route.reload();
        }


        // this one picks up the selector change
        // gets also the new and the oldvalue-
        // NOTE NOTE this one is called when value is changed
        this.onChangeFromList = function(newValue, oldValue) {
            //console.log("Hoe vaak!");

            if (newValue) {

                $scope.currentgemeente = newValue.value;

                //self.currenthtml = $sce.trustAsHtml(self.sersections[0].nl);


                $scope.hoverRegion = newValue.value;
                if (oldValue) {
                    $scope.hoverRegionLast = oldValue.value;
                }
                //console.log($scope.hoverRegion);
                //console.log($scope.hoverRegionLast);
            }
        }


        // TODO manage al the things when a user clicks an instrument
        this.instruview = false;

        this.showInstru = function() {
            this.loadingtext = "";
            this.instruview = true;
            this.loadingnow = true;
        }

        this.hideInstru = function() {
          this.loadingtext = "Laden..";
          this.instruview = false;
          this.loadingnow = false;
        };




    });
