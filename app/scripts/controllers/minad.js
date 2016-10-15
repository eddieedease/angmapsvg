'use strict';

/**
 * @ngdoc function
 * @name lsamapApp.controller:MinadCtrl
 * @description
 * # MinadCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
    .controller('MinadCtrl', function(Upload, $scope, NgTableParams, $http, $timeout, $route, apis, ipa, md5, ngToast) {

        // NOTE NOTE change
        //var nwlink = './api/';
        var nwlink = 'http://localhost:80/lsamap/app/api/';
        // instru
        var data;

        this.current = 0;
        // make ref
        var self = this;
        // scope variables
        this.md5message = 'Your pwd encryption is: ' + md5.createHash("goudvis" || '');
        this.tinymceModel = "Verander...";

        this.editinstru = false;

        this.brechtcheckboxes = {
            Buurtrecht1: false,
            Buurtrecht2: false,
            Buurtrecht3: false,
            Buurtrecht4: false,
            Buurtrecht5: false,
            Buurtrecht6: false
        };

        self.body = "<div>  </div>"; // this is important for tinymce. without content, the error does not occur
        // for linkin
        this.curmap = apis.currentMap;
        this.wrongpwtext = "";
        this.gemeenten = [];

        if (ipa.xzy === false) {
            this.minn = true;
            this.minnn = false;
        } else if (ipa.xzy === true) {
            this.minn = false;
            this.minnn = true;
        }

        self.isnew = true;


        this.loadingnow = true;
        this.loadingtext = "Laden..";

        // NOTE NOTE SERVICE CALLS
        // NOTE API call






        this.getgetget = function() {
          apis.getApi().then(function(dataResponse) {
              // NOTE 3 pieces [0] gemeenten [1] instrument [2] uploads

              apis.setSerGemeenten(dataResponse.data[0]);
              self.apiResp = dataResponse.data[0];

              // some hocus pocus to fill the table for instruments // WORKS
              data = dataResponse.data[1];
              self.tableParams = new NgTableParams({}, {
                  dataset: data
              });
              self.instrumenten = dataResponse.data[1];

          });
        }

        this.getgetget();


        // isn called but example for table
        /*var data = [{
            name: "Instrument 1",
            id: 50
        }, {
            name: "Instrument 2",
            id: 24
        }, {
            name: "Instrument 3",
            id: 10
        }];
*/






        // options for the editor
        this.tinymceOptions = {
            extended_valid_elements: "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
            theme: "modern",
            plugins: [
                "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars code fullscreen",
                "insertdatetime nonbreaking save table contextmenu directionality",
                "emoticons template paste textcolor code"
            ],
            toolbar1: "insertfile undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent",
            toolbar2: "styleselect forecolor backcolor | link | code",
            image_advtab: true,
            relative_urls: false,
            height: "300px",
            width: "100%",
            menubar: false,
        };



        // NOTE NOTE NOTE DIRECTIVES CALLS
        // NOTE these ones get called from the gemeenten directives
        $scope.mouseoverselection = function(idid) {
            //console.log("controller HIITTTTTT");
            //console.log(idid);
            self.hovergemeente = idid;
        }

        $scope.mouseremoveselection = function(idid) {
            self.hovergemeente = "";
        }

        $scope.mouseclicked = function(idid) {
            //console.log("controller HIITTTTTT");
            //console.log(idid + "clicked");
            self.currentgemeente = idid;

        }

        // calls from the directive
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
                //console.log("halloooo");
                self.loadingnow = false;
                self.current = 1;
            }
        }

        // this one picks up the selector change
        // gets also the new and the oldvalue-
        // NOTE NOTE this one is called when value is changed
        this.onChangeFromList = function(newValue, oldValue) {
            //console.log("Hoe vaak!");

            if (newValue) {
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
                        self.tinymceModel = self.apiResp[i].wysig;
                        // Check for buurtrechten
                        var tempstring = self.apiResp[i].buurtrecht;
                        var tempArray = tempstring.split(",");
                        console.log(tempArray);
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
                    }
                }


                //self.currenthtml = $sce.trustAsHtml(self.sersections[0].nl);
                $scope.hoverRegion = newValue.value;
                if (oldValue) {
                    $scope.hoverRegionLast = oldValue.value;
                }
            }
        }



        // NOTE NOTE NOTE
        // NOTE This are the Controllers own functions (so not Scope related)
        this.setMap = function(whichmap) {
            apis.currentMap = whichmap;
            // NOTE for the record, when the page view is changed, we need to reload the route
            // the service variable currentmap will force render the new colours
            $route.reload();

            //$scope.$apply()
        }

        // NOTE NOTE vieuw controll
        //switching the instru views
        this.goInstruEdit = function() {
            this.instruaction = "new";
            if (this.editinstru === false) {
                this.editinstru = true;
            } else if (this.editinstru === true) {
                this.editinstru = false;
            }
        }

        this.goeditInstru = function() {
            this.instruaction = "editexisting";
            self.editinstru = true;
            // TODO implement to take current objectnode and assign view
        }

        // Logging in over here, Now for testing purposes
        // TODO MD5 PHP MSQL COnnect, special login script
        this.inlogger = function() {
            //console.log("controller HIITTTTTT");
            //console.log(idid);
            if (this.user === "Admin" && this.userpw === "goudvis") {
                this.wrongpwtext = "Alllright Good";
                this.minn = false;
                this.minnn = true;
                ipa.xyzg();
            } else {
                this.wrongpwtext = "Fout";
            }
        }



        // The API stuff
        //
        //
        //

        // NOTE NOTE NOTE
        // NOTE NOTE NOTE
        // NOTE NOTE NOTE Voorbeeldfunctie
        this.voorbeeldfunc = function() {
            this.myPromise = $http({
                method: "post",
                url: nwlink + 'chng.php',
                // actions and parameters
                data: {
                    action: "newgemeente",
                    name: self.currentgemeente,
                    wysig: self.tinymceModel,
                    buurtrechten: buurtrechtstring
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            this.myPromise.success(function(data) {
                console.log(data);
            });
        }

        // NOTE NOTE the upload script for images // WORKS
        this.uploadprep = function() {
            //console.log(this.file.$ngfName);
            //  if (self.file.$valid && self.file) {
            self.uploadNow(this.file);
            //  }
        }

        this.uploadNow = function(filez) {
            //console.log(filez);
            if (filez !== null) {
                //console.log('upload triggered');
                // TODO TODO switch  http://localhost:8888/chaletrenesse/app/api/upload.php        -----   ./api/upload.php
                Upload.upload({
                    url: nwlink + 'upload.php',
                    method: 'POST',
                    file: filez,
                    data: {
                        'cat': "gemeente",
                        'description': self.afbtitel,
                        'extrainfo': self.currentgemeente
                    }
                }).then(function(resp) {
                    console.log(resp);
                    self.file = null;
                    //ngToast.create('Geupload');
                    //self.updateService();
                })
            }
        };



        // NOTE NOTE NOTE NOTE NOTE
        // NOTE NOTE NOTE NOTE Handling all the request
        // NOTE update RECORDS
        this.updateGemeenten = function() {
            console.log('poging tot opslaan');

            var arrayforstring = [];
            //arrayforstring.push("1");
            // collect buurtrechten
            console.log(this.brechtcheckboxes.Buurtrecht1);
            if (this.brechtcheckboxes.Buurtrecht1) {
                arrayforstring.push("1");
            }
            if (this.brechtcheckboxes.Buurtrecht2) {
                arrayforstring.push("2");
            }
            if (this.brechtcheckboxes.Buurtrecht3) {
                arrayforstring.push("3");
            }
            if (this.brechtcheckboxes.Buurtrecht4) {
                arrayforstring.push("4");
            }
            if (this.brechtcheckboxes.Buurtrecht5) {
                arrayforstring.push("5");
            }
            if (this.brechtcheckboxes.Buurtrecht6) {
                arrayforstring.push("6");
            }
            var buurtrechtstring = arrayforstring.join();

            console.log(self.currentgemeente);
            // first check if it is a edit or a new one
            if (self.isnew === true && self.currentgemeente !== undefined) {
                this.myPromise = $http({
                    method: "post",
                    url: nwlink + 'chng.php',
                    data: {
                        action: "newgemeente",
                        name: self.currentgemeente,
                        wysig: self.tinymceModel,
                        buurtrechten: buurtrechtstring
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                /* Check whether the HTTP Request is Successfull or not. */
                this.myPromise.success(function(data) {
                    //self.updateService();
                    console.log(data);
                    ngToast.create('Instellingen opgeslagen');
                    $route.reload();
                });
            } else if (self.isnew === false && self.currentgemeente !== undefined) {
                this.myPromise = $http({
                    method: "post",
                    url: nwlink + 'chng.php',
                    data: {
                        action: "editgemeente",
                        name: self.currentgemeente,
                        wysig: self.tinymceModel,
                        buurtrechten: buurtrechtstring
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                /* Check whether the HTTP Request is Successfull or not. */
                this.myPromise.success(function(data) {
                    //self.updateService();
                    console.log(data);
                    $route.reload();
                });
            }
        };


        // editting the instrument, switch on action for new one if one doesn't exist
        this.editInstru = function() {
            console.log('editting Instru');
            console.log(this.instruName);
            console.log(this.tinymceModelinstru);


            var instrustringg = this.instrugems.join();
            console.log(instrustringg);

            console.log(this.instrulink);


            switch (this.instruaction) {
                case "new":
                    this.myPromise = $http({
                        method: "post",
                        url: nwlink + 'chng.php',
                        // actions and parameters
                        data: {
                            action: "newinstrument",
                            name: self.instruName,
                            wysig: self.tinymceModelinstru,
                            gemeenten: instrustringg,
                            buurtrechten: this.instrulink
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    /* Check whether the HTTP Request is Successfull or not. */
                    this.myPromise.success(function(data) {
                        console.log(data);
                        self.getgetget();
                        self.editinstru = false;

                    });


                    break;
                case "editexisting":

                    break;
                default:

            }

        }


        // TODO implement deleting of instruments by id
        this.delInstru = function(delthis) {
            console.log("Deleting instrument")
            this.myPromise = $http({
                method: "post",
                url: nwlink + 'chng.php',
                // actions and parameters
                data: {
                    action: "removeinstrument",
                    id: delthis
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            this.myPromise.success(function(data) {
                self.getgetget();
            });
        }

    });
