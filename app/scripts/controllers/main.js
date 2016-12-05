'use strict';



/**
 * @ngdoc function
 * @name lsamapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
    .controller('MainCtrl', function($scope, $rootScope, $compile, $window, NgTableParams, $anchorScroll, $timeout, $http, $sce, $route, apis, $routeParams) {

        // try to take routing
        //this.keyyy = $location.url();
        //this.keyy = $scope.keyyy.replace('/', '');
        //console.log($routeParams.gemeente);
        //console.log($route);
        // always bind self for various (aqr) reasons
        var self = this;
        var data;
        this.current = 0;
        this.max = 410;
        this.loadingnow = true;
        this.datesArray = [];
        this.loadingtext = "Laden..";
        this.starttekst = "Klik op een gemeente/Gebruik de zoekbalk hierboven voor verdere informatie.";

        this.mappselect = [apis.currentMap];

        this.detailpage = false;
        this.textshort = true;


        this.mapps = [{
            code: 0,
            label: "Geheel overzicht",
            icon: "images/smallicons/lsa.png"
        }, {
            code: 1,
            label: "Beheer van voorzieningen",
            icon: "images/smallicons/small2.png"
        }, {
            code: 2,
            label: "Toegang tot geld",
            icon: "images/smallicons/small3.png"
        }, {
            code: 3,
            label: "Open Overheid",
            icon: "images/smallicons/small5.png"
        }, {
            code: 4,
            label: "Zelfgekozen ondersteuning",
            icon: "images/smallicons/small6.png"
        }, {
            code: 5,
            label: "Maatschappelijk aanbesteden",
            icon: "images/smallicons/small4.png"
        }, {
            code: 6,
            label: "Plannen voor de buurt",
            icon: "images/smallicons/small1.png"
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
            self.instrumentenbuurtrechten = [];
            self.uploads = dataResponse.data[2];
            //self.apiResp = "chck";

            // TODO assign the random values and last editted set everything up

            for (var n = 0; n < self.instrumenten.length; n++) {
                //console.log(self.instrumenten[n])

                //console.log(typeof(apis.currentMap));

                var intlink = parseInt(self.instrumenten[n].link);


                if (intlink === apis.currentMap) {
                    self.instrumentenbuurtrechten.push(self.instrumenten[n]);
                }
            }

            if (apis.currentMap === 0) {
                self.instrumentenbuurtrechten = null;
            } else {
                self.starttekst = "Klik op een gemeente/Gebruik de zoekbalk hierboven voor verdere informatie. Je kunt ook hieronder door instrumenten zoeken die horen bij dit buurtrecht";
            }

            self.linkieshow = false;


            console.log(self.instrumenten);
            console.log(self.instrumentenbuurtrechten);

            // some hocus pocus to fill the table for instruments // WORKS
            data = self.instrumentenbuurtrechten;
            self.tableParams = new NgTableParams({}, {
                dataset: data
            });

            var rand = self.instrumenten[Math.floor(Math.random() * self.instrumenten.length)];
            // Get the Random one
            self.randinstrumentnaam = rand.name;
            var ranwysigin = rand.wysig;
            self.randinstrumentwysig = $sce.trustAsHtml(ranwysigin);
            self.randinstrumentgemeenten = rand.gemeentenlink;

            // Get the last editted
            // first convert timestamps to date and put in array


            for (var i = 0; i < self.apiResp.length; i++) {
                var t = self.apiResp[i].date.split(/[- :]/);
                // Apply each element to the Date function
                var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
                self.datesArray.push(d);
            }

            var lastposition = 0;
            var enalastposition = 0;
            var enaenalastposition = 0;
            var d = new Date("2010-10-17 17:05:2");
            var e = new Date("2009-10-17 17:05:2");
            var f = new Date("2008-10-17 17:05:2");
            // now loop through though id and get current id number.
            for (var r = 0; r < self.datesArray.length; r++) {
                if (self.datesArray[r] > d) {
                    d = self.datesArray[r];
                    lastposition = r;
                } else if (self.datesArray[r] < d && self.datesArray[r] > e) {
                    e = self.datesArray[r];
                    enaenalastposition = enalastposition;
                    enalastposition = r;
                }
            }

            self.lastgemedit = self.apiResp[lastposition].name;
            self.enalastgemedit = self.apiResp[enalastposition].name;

            self.lastgemedittime = self.apiResp[lastposition].date;
            self.enalastgemedittime = self.apiResp[enalastposition].date;

            // NOTE check for routeparam NOTE this func is a copy of the onListChange, since I couldn't get it to work otherwise
            if ($routeParams.gemeente !== undefined) {
                console.log("before" + self.currentgemeente);
                self.currentgemeente = $routeParams.gemeente;
                console.log("after" + self.currentgemeente);

                //console.log("Hoe vaak!");
                self.starttekst = "";
                //clear everything
                self.images = [];
                self.instrus = [];
                self.currentwysig = "";
                // first reset checkboxes
                self.brechtcheckboxes = {
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
                        self.currentgemeente = self.apiResp[i].name;
                        $scope.currentgemeente = self.apiResp[i].name;
                        self.curcur = self.apiResp[i].name;
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
            }

        });



        // set up all local variables
        this.curmap = apis.currentMap;
        this.gemeenten = [];
        this.introtekst = "Click  on something!";

        $scope.testttt = Math.random();


        $scope.hoverRegion = "";
        // NOTE DIRECTIVES/ SCOPE CALLS
        // these ones get called from the gemeenten directives

        this.lasteditclick = function(gem) {
            self.currentgemeente = gem;

        }


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
            };
            self.gemeenten.push(nieuw);

            // sort alphabetical
            self.gemeenten.sort(function(a, b) {
                // ascending alfabetical
                if (a.label < b.label) return -1;
                if (a.label > b.label) return 1;
            });


            // write to the loader - but thus kinda doens't work
            self.current = self.current + 1;
            // NOTE NOTE NOTE NOTE ER ZIJN NU 390 ACTIEVE GEMEENTEN!
            if (self.current === 390) {
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
            self.instrumentenbuurtrechten = null;
            self.linkieshow = true;
            //console.log("Hoe vaak!");
            this.starttekst = "";
            //$route.reload();

            if (newValue) {
                //clear everything
                self.images = [];
                self.instrus = [];
                self.currentwysig = "";
                $scope.currentgemeente = newValue.value;
                self.currentgemeente = newValue.value;
                self.curcur = newValue.value;



                // TODO TODO TODO
                // The addthis functions only renders on init dom, so we will have to rerender the soab
                // BUT we will definitely having this

                //var templates = '<sn-addthis-toolbox class="addthis_custom_sharing" data-share="{title: "Buurtrechten" +self.currentgemeente + " in kaart. Door LSA-Bewoners", url: "http://edtestic.nl#?gemeente=" + self.currentgemeente, description: "informatie over" + self.currentgemeente}"><a href class="addthis_button_twitter">Facebook</a> </sn-addthis-toolbox>';

                //angular.element('rerender').append($compile(templates)($scope));





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
            this.detailpage = false;
        }

        this.hideInstru = function() {
            this.loadingtext = "Laden..";
            this.instruview = false;
            this.loadingnow = false;
        };

        this.hideDetail = function() {
            this.loadingtext = "Laden..";
            this.detailpage = false;
            this.loadingnow = false;
            self.textshort = true;
            self.linkieshow = true;
        };

        this.showFullText = function() {
            self.linkieshow = false;
            self.textshort = false;
            console.log("show more text!");
            self.loadingnow = true;
            self.detailpage = true;
            self.instruview = false;
            $window.scrollTo(0, 50);
        }

        this.nextrandominstru = function() {
            var rand = self.instrumenten[Math.floor(Math.random() * self.instrumenten.length)];
            // Get the Random one
            self.randinstrumentnaam = rand.name;
            var ranwysigin = rand.wysig;
            self.randinstrumentwysig = $sce.trustAsHtml(ranwysigin);
            self.randinstrumentgemeenten = rand.gemeentenlink;
        }


    });
