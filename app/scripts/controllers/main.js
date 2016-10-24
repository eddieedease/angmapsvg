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

        this.starttekst = "Klik op een gemeente voor informatie";

        this.mappselect = [apis.currentMap];

        this.mapps = [{
            code: 0,
            label: "Geheel overzicht",
            icon: "images/smallicons/small1.png"
        }, {
            code: 1,
            label: "Beheer van voorzieningen",
            icon: "images/smallicons/small1.png"
        }, {
            code: 2,
            label: "Toegang tot geld",
            icon: "images/smallicons/small2.png"
        }, {
            code: 3,
            label: "Open Overheid",
            icon: "images/smallicons/small3.png"
        }, {
            code: 4,
            label: "Zelfgekozen ondersteuning",
            icon: "images/smallicons/small4.png"
        }, {
            code: 5,
            label: "Maatschappelijk aanbesteden",
            icon: "images/smallicons/small5.png"
        }, {
            code: 6,
            label: "Plannen voor de buurt",
            icon: "images/smallicons/small6.png"
        }];


        this.soortkaart = "Geheel overzicht";

        switch (apis.currentMap) {
            case 0:
                this.soortkaart = "Heel overzicht";
                this.fulllegenda = true;
                break;
            case 1:
                this.soortkaart = "Beheer van voorzieningen";
                this.fulllegenda = false;
                break;
            case 2:
                this.soortkaart = "Toegang tot geld";
                this.fulllegenda = false;
                break;
            case 3:
                this.soortkaart = "Open overheid";
                this.fulllegenda = false;
                break;
            case 4:
                this.soortkaart = "Zelfgekozen ondersteuning";
                this.fulllegenda = false;
                break;
            case 5:
                this.soortkaart = "Maatschappelijk aanbesteden";
                this.fulllegenda = false;
                break;
            case 6:
                this.soortkaart = "Plannen voor de buurt";
                this.fulllegenda = false;
                break;
        }



        // NOTE NOTE SERVICE CALLS
        // NOTE API call
        apis.getApi().then(function(dataResponse) {
            // NOTE 3 pieces [0] gemeenten [1] instrument [2] uploads

            //update the service so that directive kan acces it
            apis.setSerGemeenten(dataResponse.data[0]);
            self.apiResp = dataResponse.data[0];
            self.instrumenten = dataResponse.data[1];
            self.uploads = dataResponse.data[2];
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
            apis.currentMap = thismap;
            //self.loadingnow = true;
            // NOTE for the record, when the page view is changed, we need to reload the route
            // the service variable currentmap will force render the new colours
            this.loadingnow = true;

            $timeout(self.reloadroute, 500);
            //self.loadingnow = false;
        }

        this.onMapChange = function(newValue, oldValue) {
            //console.log("Hoe vaak!");
            console.log(newValue);
            console.log(oldValue);
            if (newValue && oldValue !== undefined) {
                apis.currentMap = newValue.code;
                this.loadingnow = true;
                $timeout(self.reloadroute, 500);
            }
        }

        this.reloadroute = function() {
            $route.reload();
        }


        // this one picks up the selector change
        // gets also the new and the oldvalue-
        // NOTE NOTE this one is called when value is changed
        this.onChangeFromList = function(newValue, oldValue) {
            //console.log("Hoe vaak!");
            this.starttekst = "";
            if (newValue) {
                //clear everything
                self.images = [];
                self.instrus = [];
                self.currentwysig = "";
                $scope.currentgemeente = newValue.value;
                self.currentgemeente = newValue.value;
                // first reset checkboxes
                this.brechtcheckboxes = {
                    Buurtrecht1: false,
                    Buurtrecht2: false,
                    Buurtrecht3: false,
                    Buurtrecht4: false,
                    Buurtrecht5: false,
                    Buurtrecht6: false
                };
                // TODO check the 'name' of gemeenteagainst api, if it matches, set variables
                for (var i = 0; i < self.apiResp.length; i++) {

                    if (self.apiResp[i].name === self.currentgemeente) {
                        var wysigsce = self.apiResp[i].wysig;

                        self.currentwysig = $sce.trustAsHtml(wysigsce);
                        // Check for buurtrechten
                        var tempstring = self.apiResp[i].buurtrecht;
                        var tempArray = tempstring.split(",");
                        for (var b = 0; b < tempArray.length; b++) {
                            if (tempArray[b] === "1") {
                                self.brechtcheckboxes.Buurtrecht1 = true;
                            }
                            if (tempArray[b] === "2") {
                                self.brechtcheckboxes.Buurtrecht2 = true;
                            }
                            if (tempArray[b] === "3") {
                                self.brechtcheckboxes.Buurtrecht3 = true;
                            }
                            if (tempArray[b] === "4") {
                                self.brechtcheckboxes.Buurtrecht4 = true;
                            }
                            if (tempArray[b] === "5") {
                                self.brechtcheckboxes.Buurtrecht5 = true;
                            }
                            if (tempArray[b] === "6") {
                                self.brechtcheckboxes.Buurtrecht6 = true;
                            }

                        }
                        self.isnew = false;



                        // TODO build the new images array
                        // expects   this.images: Array of objects
                        /*  {
                              title: 'Coole titel',
                              thumbUrl: 'images/castle1.jpg',
                              url: 'images/castle1.jpg',
                          }*/

                        for (var z = 0; z < self.uploads.length; z++) {
                            if (self.uploads[z].extrainfo === self.currentgemeente) {
                                var object = {
                                    title: self.uploads[z].description,
                                    thumbUrl: self.uploads[z].location,
                                    url: self.uploads[z].location
                                }
                                self.images.push(object);
                            }
                        }

                        for (var x = 0; x < self.instrumenten.length; x++) {
                            var isoarray = self.instrumenten[x].gemeentenlink.split(",");
                            for (var a = 0; a < isoarray.length; a++) {
                                if (isoarray[a] === self.currentgemeente) {
                                    self.instrus.push(self.instrumenten[x]);
                                }
                            }
                        }
                    }
                }

                $scope.hoverRegion = newValue.value;
                if (oldValue) {
                    $scope.hoverRegionLast = oldValue.value;
                }
            }
        }


        // TODO manage al the things when a user clicks an instrument
        this.instruview = false;

        this.showInstru = function(thisidd) {


            for (var i = 0; i < self.instrumenten.length; i++) {
                if (self.instrumenten[i].id === thisidd) {
                    self.instrumentnaam = self.instrumenten[i].name;
                    var wysiginstrsce = self.instrumenten[i].wysig;
                    self.instrumentwysig = $sce.trustAsHtml(wysiginstrsce);
                    self.instrumentgemeenten = self.instrumenten[i].gemeentenlink;
                }
            }



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
