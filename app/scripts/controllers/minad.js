'use strict';

/**
 * @ngdoc function
 * @name lsamapApp.controller:MinadCtrl
 * @description
 * # MinadCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
    .controller('MinadCtrl', function($scope, NgTableParams, $timeout, $route, apis,ipa, md5) {

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
        } else if (ipa.xzy === true ){
          this.minn = false;
          this.minnn = true;
        }



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
            //console.log("controller HIITTTTTT");
            var nieuw = {
                value: gem,
                label: gem
            }
            self.gemeenten.push(nieuw);
            self.gemeenten.sort(function(a, b) {
                // Ascending: first age less than the previous
                if (a.label < b.label) return -1;
                if (a.label > b.label) return 1;
            });
            console.log();
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
    });
