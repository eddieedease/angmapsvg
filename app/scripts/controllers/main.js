'use strict';



/**
 * @ngdoc function
 * @name lsamapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
    .controller('MainCtrl', function ($scope, $rootScope, $compile, $window, NgTableParams, $anchorScroll, $timeout, $http, $sce, $route, apis, $routeParams) {


        var self = this;
        var data;
        this.current = 0;
        this.max = 410;
        this.loadingnow = true;
        this.notmobile = true;

        this.isnotff = false;
        this.datesArray = [];
        this.loadingtext = "Laden..";
        this.starttekst = "Klik op een gemeente/Gebruik de zoekbalk hierboven voor verdere informatie.";

        this.mappselect = [apis.currentMap];

        this.detailpage = false;
        this.textshort = true;

        this.detail1 = false;
        this.detail2 = false;
        this.detail3 = false;
        this.detail4 = false;
        this.detail5 = false;
        this.detail6 = false;
        // inleiding per buurtrecht
        this.inleiding = false;

        //main inleiding
        this.mainInleiding = false;


        this.mapps = [{
            code: 0,
            label: "Geheel overzicht",
            icon: "images/smallicons/lsa.png"
        }, {
            code: 1,
            label: "Recht op gebouwen",
            icon: "images/smallicons/small2.png"
        }, {
            code: 5,
            label: "Recht om uit te dagen",
            icon: "images/smallicons/small4.png"
        }, {
            code: 6,
            label: "Recht op buurtplanning",
            icon: "images/smallicons/small1.png"
        }, {
            code: 3,
            label: "Open Overheid",
            icon: "images/smallicons/small5.png"
        }, {
            code: 2,
            label: "Toegang tot geld",
            icon: "images/smallicons/small3.png"
        }, {
            code: 4,
            label: "Zelfgekozen ondersteuning",
            icon: "images/smallicons/small6.png"
        }];


        this.soortkaart = "Geheel overzicht";

        switch (apis.currentMap) {
            case 0:
                this.soortkaart = "Geheel overzicht";
                this.fulllegenda = true;
                break;
            case 1:
                this.soortkaart = "Recht op gebouwen";
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
                this.soortkaart = "Recht om uit te dagen";
                this.fulllegenda = false;
                break;
            case 6:
                this.soortkaart = "Recht op buurtplanning";
                this.fulllegenda = false;
                break;
        }



        // NOTE NOTE SERVICE CALLS
        // NOTE API call
        apis.getApi().then(function (dataResponse) {
            // NOTE 4 pieces [0] gemeenten [1] instrument [2] uploads [3] about
            console.log("hieronder");
            console.log(dataResponse);
            //update the service so that directive kan acces it
            apis.setSerGemeenten(dataResponse.data[0]);
            self.apiResp = [];
            self.apiResp = dataResponse.data[0];
            self.instrumenten = dataResponse.data[1];
            self.instrumentenbuurtrechten = [];
            self.uploads = dataResponse.data[2];

            self.about = dataResponse.data[3];
            self.inLeiding = self.about[0].text7;
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
                self.starttekst = "Klik op een gemeente/Gebruik de zoekbalk hierboven voor verdere informatie.";
            }

            self.linkieshow = false;


            //console.log(self.instrumenten);
            //console.log(self.instrumentenbuurtrechten);

            // some hocus pocus to fill the table for instruments // WORKS
            data = self.instrumentenbuurtrechten;
            self.tableParams = new NgTableParams({}, {
                dataset: data
            });

            var rand = self.instrumenten[Math.floor(Math.random() * self.instrumenten.length)];
            // Get the Random one
            //self.randinstrumentnaam = rand.name;
            // self.randinstrumentid = rand.id;
            //var ranwysigin = rand.wysig;
            // self.randinstrumentwysig = $sce.trustAsHtml(ranwysigin);
            //self.randinstrumentgemeenten = rand.gemeentenlink.split(",");


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
                console.log("after " + self.currentgemeente);
                self.linkieshow = true;
                self.inleiding = true;

                //console.log("Hoe vaak!");
                self.starttekst = "";
                //clear everything
                self.images = [];
                self.instrus = [];
                self.currentwysig = "";
                self.currentwysig1 = "";
                self.currentwysig2 = "";
                self.currentwysig3 = "";
                self.currentwysig4 = "";
                self.currentwysig5 = "";
                self.currentwysig6 = "";
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
                        console.log('HITSSSS');
                        self.currentgemeente = self.apiResp[i].name;
                        $scope.currentgemeente = self.apiResp[i].name;
                        self.curcur = self.apiResp[i].name;

                        var wysigsce = self.apiResp[i].wysig;
                        self.currentwysig = $sce.trustAsHtml(wysigsce);

                        var wysigsceb1 = self.apiResp[i].b1;
                        self.currentwysig1 = $sce.trustAsHtml(wysigsceb1);

                        var wysigsceb2 = self.apiResp[i].b2;
                        self.currentwysig2 = $sce.trustAsHtml(wysigsceb2);

                        var wysigsceb3 = self.apiResp[i].b3;
                        self.currentwysig3 = $sce.trustAsHtml(wysigsceb3);

                        var wysigsceb4 = self.apiResp[i].b4;
                        self.currentwysig4 = $sce.trustAsHtml(wysigsceb4);

                        var wysigsceb5 = self.apiResp[i].b5;
                        self.currentwysig5 = $sce.trustAsHtml(wysigsceb5);

                        var wysigsceb6 = self.apiResp[i].b6;
                        self.currentwysig6 = $sce.trustAsHtml(wysigsceb6);






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

        this.lasteditclick = function (gem) {
            self.currentgemeente = gem;

        }


        $scope.mouseoverselection = function (idid) {
            self.hovergemeente = "Muis over:  " + idid;
        }



        $scope.mouseremoveselection = function (idid) {
            self.hovergemeente = "";
        }


        $scope.mouseclicked = function (idid) {
            self.currentgemeente = idid;
        }




        $scope.collectGemeenten = function (gem) {
            var nieuw = {
                value: gem,
                label: gem
            };
            self.gemeenten.push(nieuw);

            // sort alphabetical
            self.gemeenten.sort(function (a, b) {
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
            //var svgElement = document.querySelector('#mapp')
            //var panZoomTiger = svgPanZoom(svgElement)

            if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.notmobile = false;
                self.mapzoom = svgPanZoom('#mapp', {
                    controlIconsEnabled: false,
                    dblClickZoomEnabled: false,
                    mouseWheelZoomEnabled: false,
                    preventMouseEventsDefault: false,
                    fit: false,
                    zoomScaleSensitivity: 0.2,
                    center: 1,
                    minZoom: 0.5,
                    maxZoom: 3
                });
                self.mapzoom.zoom(0.7);
            } else {
                this.notmobile = null;
                console.log("checkkk");
                if (navigator.userAgent.indexOf("Firefox") > 0) {
                    self.isnotff = true;
                } else {
                    self.mapzoom = svgPanZoom('#mapp', {
                        controlIconsEnabled: true,
                        dblClickZoomEnabled: false,
                        mouseWheelZoomEnabled: false,
                        preventMouseEventsDefault: false,
                        fit: false,
                        zoomScaleSensitivity: 0.2,
                        center: 1,
                        minZoom: 0.5,
                        maxZoom: 3
                    });
                    self.mapzoom.zoom(1.1);
                }
               
            }
        }

        /*  // NOTE timeout example TODO; mayB calls this when loading
          $timeout(function() {
            console.log("timeouterrrrr");
            //var panZoomTiger = svgPanZoom('mapp');
          }, 2000);*/

        // NOTE NOTE NOTE
        // NOTE FUNCTIONS FROM SELF/CONTROLLER


        this.showInleiding = function() {
            self.mainInleiding = !self.mainInleiding;
        }


        this.setMap = function (whichmap) {
            var thismap = parseInt(whichmap)
            apis.currentMap = thismap;
            //self.loadingnow = true;
            // NOTE for the record, when the page view is changed, we need to reload the route
            // the service variable currentmap will force render the new colours
            this.loadingnow = true;

            $timeout(self.reloadroute, 500);
            //self.loadingnow = false;
        }

        this.onMapChange = function (newValue, oldValue) {

            if (newValue && oldValue !== undefined) {
                apis.currentMap = newValue.code;
                this.loadingnow = true;
                $timeout(self.reloadroute, 500);
            }
        }

        this.reloadroute = function () {
            $route.reload();
        }


        // this one picks up the selector change
        // gets also the new and the oldvalue-
        // NOTE NOTE this one is called when value is changed
        this.onChangeFromList = function (newValue, oldValue) {
            self.instrumentenbuurtrechten = null;
            self.linkieshow = true;
            console.log("uhmz>");
            //console.log("Hoe vaak!");
            this.starttekst = "";
            //$route.reload();

            if (newValue) {
                //clear everything
                self.images = [];
                self.instrus = [];
                self.currentwysig = "";

                self.currentwysig1 = "";
                self.currentwysig2 = "";
                self.currentwysig3 = "";
                self.currentwysig4 = "";
                self.currentwysig5 = "";
                self.currentwysig6 = "";




                $scope.currentgemeente = newValue.value;
                self.currentgemeente = newValue.value;
                self.curcur = newValue.value;

                // TODO TODO TODO_ Link 1 WORKS!
                // The addthis functions only renders on init dom, so we will have to rerender the soab
                // BUT we will definitely having this
                var templates = '<sn-addthis-toolbox class="addthis_custom_sharing" data-share="{title: \'Buurtrechten \' + main.currentgemeente + \' in kaart. Door LSA-Bewoners\', url: \'http://edtestic.nl#?gemeente=\' + main.currentgemeente, description: \'informatie over\' + main.currentgemeente}"><a href class="addthis_button_facebook">Facebook</a> </sn-addthis-toolbox><sn-addthis-toolbox class="addthis_custom_sharing" data-share="{title: \'Buurtrechten \' + main.currentgemeente + \' in kaart. Door LSA-Bewoners\', url: \'http://edtestic.nl#?gemeente=\' + main.currentgemeente, description: \'informatie over\' + main.currentgemeente}"><a href class="addthis_button_twitter">Twitter</a> </sn-addthis-toolbox><sn-addthis-toolbox class="addthis_custom_sharing" data-share="{title: \'Buurtrechten \' + main.currentgemeente + \' in kaart. Door LSA-Bewoners\', url: \'http://edtestic.nl#?gemeente=\' + main.currentgemeente, description: \'informatie over\' + main.currentgemeente}"><a href class="addthis_button_email">Mail</a> </sn-addthis-toolbox>';
                //console.log(templates);
                angular.element('sn-addthis-toolbox').remove();
                angular.element('rerender').append($compile(templates)($scope));





                // first reset checkboxes
                this.brechtcheckboxes = {
                    Buurtrecht1: false,
                    Buurtrecht2: false,
                    Buurtrecht3: false,
                    Buurtrecht4: false,
                    Buurtrecht5: false,
                    Buurtrecht6: false
                };
                self.inleiding = false;
                // TODO check the 'name' of gemeenteagainst api, if it matches, set variables
                for (var i = 0; i < self.apiResp.length; i++) {
                    if (self.apiResp[i].name === self.currentgemeente) {

                        // TODO TODO NOTE NOTE because super not efficient
                        self.images = [];
                        self.instrus = [];
                        self.inleiding = true;

                        console.log(self.apiResp[i]);
                        var wysigsce = self.apiResp[i].wysig;
                        self.currentwysig = $sce.trustAsHtml(wysigsce);

                        var wysigsceb1 = self.apiResp[i].b1;
                        self.currentwysig1 = $sce.trustAsHtml(wysigsceb1);

                        var wysigsceb2 = self.apiResp[i].b2;
                        self.currentwysig2 = $sce.trustAsHtml(wysigsceb2);

                        var wysigsceb3 = self.apiResp[i].b3;
                        self.currentwysig3 = $sce.trustAsHtml(wysigsceb3);

                        var wysigsceb4 = self.apiResp[i].b4;
                        self.currentwysig4 = $sce.trustAsHtml(wysigsceb4);

                        var wysigsceb5 = self.apiResp[i].b5;
                        self.currentwysig5 = $sce.trustAsHtml(wysigsceb5);

                        var wysigsceb6 = self.apiResp[i].b6;
                        self.currentwysig6 = $sce.trustAsHtml(wysigsceb6);





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
                                console.log(object);
                                var object = {
                                    title: self.uploads[z].description,
                                    thumbUrl: self.uploads[z].location,
                                    url: self.uploads[z].location,
                                    id: z
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

        this.showInstru = function (thisidd) {


            for (var i = 0; i < self.instrumenten.length; i++) {
                if (self.instrumenten[i].id === thisidd) {
                    self.instrumentnaam = self.instrumenten[i].name;
                    var wysiginstrsce = self.instrumenten[i].wysig;
                    self.instrumentwysig = $sce.trustAsHtml(wysiginstrsce);
                    self.instrumentgemeenten = self.instrumenten[i].gemeentenlink;
                }
            }


            $window.scrollTo(0, 50);
            this.loadingtext = "";
            this.instruview = true;
            this.loadingnow = true;
            this.detailpage = false;
        }

        this.hideInstru = function () {
            this.loadingtext = "Laden..";
            this.instruview = false;
            this.loadingnow = false;
            self.textshort = true;
            self.linkieshow = true;
        };

        this.hideDetail = function () {
            this.loadingtext = "Laden..";
            this.detailpage = false;
            this.loadingnow = false;
            self.textshort = true;
            self.linkieshow = true;
        };

        this.gemfrominstruClick = function (idid) {
            self.currentgemeente = idid;
            $window.scrollTo(0, 50);
        }


        this.showFullText = function (_whut) {
            self.loadingtext = "";

            self.detail1 = false;
            self.detail2 = false;
            self.detail3 = false;
            self.detail4 = false;
            self.detail5 = false;
            self.detail6 = false;

            switch (_whut) {
                case 'all':

                    if (self.brechtcheckboxes.Buurtrecht1){
                            self.detail1 = true;
                    }

                    if (self.brechtcheckboxes.Buurtrecht2){
                            self.detail2 = true;
                    }
                    if (self.brechtcheckboxes.Buurtrecht3){
                            self.detail3 = true;
                    }
                    if (self.brechtcheckboxes.Buurtrecht4){
                            self.detail4 = true;
                    }
                    if (self.brechtcheckboxes.Buurtrecht5){
                            self.detail5 = true;
                    }
                    if (self.brechtcheckboxes.Buurtrecht6){
                            self.detail6 = true;
                    }
                    


                    break;
                case 1:
                    self.detail1 = true;
                    break;
                case 2:
                    self.detail2 = true;
                    break;
                case 3:
                    self.detail3 = true;
                    break;
                case 4:
                    self.detail4 = true;
                    break;
                case 5:
                    self.detail5 = true;
                    break;
                case 6:
                    self.detail6 = true;
                    break;

            }

            //$window.scrollTo(0, 50);

            // NOTE trigger modal
            $("#myModal").modal();
        }

        this.nextrandominstru = function () {
            var rand = self.instrumenten[Math.floor(Math.random() * self.instrumenten.length)];
            self.randinstrumentnaam = rand.name;
            self.randinstrumentid = rand.id;
            var ranwysigin = rand.wysig;
            self.randinstrumentwysig = $sce.trustAsHtml(ranwysigin);
            self.randinstrumentgemeenten = rand.gemeentenlink.split(",");
        }

        //var panZoomTiger = svgPanZoom('#mapp');
        // or


        // zoomcontrols for the map
        this.zoomIn = function () {

            self.mapzoom.zoomIn(1.3);
        }

        this.zoomOut = function () {
            self.mapzoom.zoomOut(1.3);

        }

    });