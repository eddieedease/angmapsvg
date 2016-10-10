'use strict';

/**
 * @ngdoc function
 * @name lsamapApp.controller:MinadCtrl
 * @description
 * # MinadCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
    .controller('MinadCtrl', function(ngToast,$scope, NgTableParams,$http, $timeout, $route, apis, ipa, md5) {

        // NOTE NOTE change
        // var nwlink = './api/';
        var nwlink = 'http://localhost:80/lsamap/app/api/';

        this.current = 0;
        // make ref
        var self = this;
        // scope variables
        this.md5message = 'Your pwd encryption is: ' + md5.createHash("goudvis" || '');
        this.tinymceModel = "Boe";
        self.body = "<div>  </div>"; // this is important for tinymce. without content, the error does not occur
        // for linkin
        this.curmap = apis.currentMap;
        this.wrongpwtext = "";
        this.gemeenten = [];
        // NOTE NOTE NOTE eassy dev reverse!!!TODO  For now...

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



        // NOTE testing for the table sorting stuff
        var data = [{
            name: "Instrument 1",
            id: 50
        }, {
            name: "Instrument 2",
            id: 24
        }, {
            name: "Instrument 3",
            id: 10
        }];
        self.tableParams = new NgTableParams({}, {
            dataset: data
        });

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
            toolbar1: "insertfile undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link",
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
            console.log(idid + "clicked");
            self.currentgemeente = idid;

        }

        // calls from the directive
        $scope.collectGemeenten = function(gem) {
          console.log("hallo?");
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
              console.log("halloooo");
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



                // TODO check the 'name' of gemeenteagainst api, if it matches, set variables
                for (var i = 0; i < self.apiResp.length; i++) {

                  if (self.apiResp[i].name === self.currentgemeente) {
                    console.log("crazy");
                    self.tinymceModel = self.apiResp[i].wysig;

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
        // TODO allot of copied from other project, adjust
        //
        //

        // TODO uploading big photo's
        this.mainfotoup = function(filez) {
            //console.log(filez);
            if (filez !== null) {
                //console.log('uploadmain triggered');
                // TODO TODO switch  http://localhost:8888/chaletrenesse/app/api/upload.php        -----   ./api/upload.php
                Upload.upload({
                    url: nwlink + 'uploadbig.php',
                    method: 'POST',
                    file: filez
                }).then(function(resp) {
                    ngToast.create('Geupload');
                    self.updateService();
                })
            }
        };

        // TODO uploading small photo's
        this.buurtfotoup = function(id) {
            //console.log(id);
            if (this.buurtfoto !== null) {
                // TODO TODO switch  http://localhost:8888/chaletrenesse/app/api/upload.php        -----   ./api/upload.php
                Upload.upload({
                    url: nwlink + 'uploadsmall.php',
                    method: 'POST',
                    file: self.buurtfoto,
                    sendFieldsAs: 'form',
                    fields: {
                        id: id
                    }
                }).then(function(resp) {
                    ngToast.create('Geupload');
                    self.updateService();
                })
            }
        };


        // NOTE NOTE NOTE NOTE NOTE
        // NOTE NOTE NOTE NOTE Handling all the request
        // NOTE update RECORDS

        this.updateGemeenten = function() {
            console.log('poging tot opslaan');

            // first check if it is a edit or a new one
            if (self.isnew === true) {
              this.myPromise = $http({
                  method: "post",
                  url: nwlink + 'chng.php',
                  data: {
                      action: "newgemeente",
                      name: self.currentgemeente,
                      wysig: self.tinymceModel,
                      buurtrechten: "1,2,3"
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
              });
            } else {
              this.myPromise = $http({
                  method: "post",
                  url: nwlink + 'chng.php',
                  data: {
                      action: "editgemeente",
                      name: self.currentgemeente,
                      wysig: self.tinymceModel,
                      buurtrechten: "1,2,3"
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
              });
            }



        }
    });
