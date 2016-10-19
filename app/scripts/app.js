'use strict';

/**
 * @ngdoc overview
 * @name lsamapApp
 * @description
 * # lsamapApp
 *
 * Main module of the application.
 */
var app = angular
    .module('lsamapApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'selector',
        'angular-md5',
        'ui.tinymce',
        'angular-svg-round-progressbar',
        'ngTable',
        'thatisuday.ng-image-gallery',
        'ngToast',
        'ngFileUpload',
        'scrollto'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/minad', {
                templateUrl: 'views/minad.html',
                controller: 'MinadCtrl',
                controllerAs: 'minad'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    // NOTE NOTE 2 directives, 1 to load the svg, 1 for the gemeenten node in it
    .directive('svgMap', function($compile, apis) {
        // loading the svgMap, TODO connect to service
        return {
            restrict: 'A',
            templateUrl: 'images/Nederland2016.svg',
            link: function(scope, element, attrs) {

            }
        } // NOTE Below showing of the directive to take over 'gemeente' nodes
    }).directive('gemeente', function($compile, apis) {
        return {
            restrict: 'A',
            transclude: true,
            // apparantly we need a blanco scope
            scope: {

            },
            link: function(scope, element, attrs) {
                scope.elementGem = element.attr("gem");


                //console.log(apis.serGemeenten);




                scope.$parent.collectGemeenten(scope.elementGem);

                element.attr("ng-click", "gemeenteClick()");
                element.attr("ng-mouseenter", "mouseEnter()");

                element.attr("ng-mouseleave", "mouseLeaves()");
                element.attr("mouseoverselection", "mouseoverselection");

                // NOTE NOTE - now works -  really long struggles here
                // Add a watcher so that controller selector can influence directive
                scope.$parent.$watch('hoverRegion', function() {
                    if (scope.$parent.hoverRegion === scope.elementGem) {
                        element.attr("ng-class", "{active:true}");
                        console.log(scope.$parent.hoverRegion);
                        $compile(element)(scope);
                    }
                    if (scope.$parent.hoverRegionLast === scope.elementGem) {
                        // TODO this aint the way, the hover doens't get recognised anymore
                        // so, must be another solutions
                        element.removeAttr("class");
                        //element.removeAttr("gemeente");
                        //element.attr("ng-class", "gemeente");
                        element.attr("ng-class", "gemeente");
                        console.log(scope.$parent.hoverRegionLast);
                        $compile(element)(scope);
                    }
                });
                // count aantal buurtrechten & paint
                scope.komtvoor = false;








                for (var i = 0; i < apis.serGemeenten.length; i++) {
                    if (apis.serGemeenten[i].name === scope.elementGem) {
                        scope.komtvoor = true;
                        scope.buurtrechtarray = apis.serGemeenten[i].buurtrecht.split(',');



                        // TODO TODO TODO TODO TODO
                        // TODO TODO TODO TODO TODO
                        // place here the script that loads the different maps? Switch?
                        // TODO TODO also set the currentMap name in the service!
                        // TODO think it needs to be set in the service





                        switch (apis.currentMap) {
                            case 0:

                                // Paint them shizzle
                                switch (scope.buurtrechtarray.length) {
                                    case 0:
                                        element.attr("ng-attr-fill", "{{0.2 | map_colour}}");
                                        break;
                                    case 1:
                                        element.attr("ng-attr-fill", "{{0.5 | map_colour}}");
                                        break;
                                    case 2:
                                        element.attr("ng-attr-fill", "{{0.6 | map_colour}}");
                                        break;
                                    case 3:
                                        element.attr("ng-attr-fill", "{{0.7 | map_colour}}");
                                        break;
                                    case 4:
                                        element.attr("ng-attr-fill", "{{0.8 | map_colour}}");
                                        break;
                                    case 5:
                                        element.attr("ng-attr-fill", "{{0.9 | map_colour}}");
                                        break;
                                    case 6:
                                        element.attr("ng-attr-fill", "{{1 | map_colour}}");
                                        break;
                                    default:
                                }
                                break;
                            case 1:

                                var switch1 = false;
                                for (var q = 0; q < scope.buurtrechtarray.length; q++) {
                                    console.log(scope.buurtrechtarray[q]);
                                    if (scope.buurtrechtarray[q] === "1") {
                                        switch1 = true;
                                    }
                                }

                                if (switch1 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_colour2}}");
                                };

                                //element.attr("ng-attr-fill", "{{1 | map_colour}}");

                                break;
                            case 2:
                                var switch2 = false;
                                for (var w = 0; w < scope.buurtrechtarray.length; w++) {
                                    
                                    if (scope.buurtrechtarray[w] === "2") {
                                        switch2 = true;
                                    }
                                }

                                if (switch2 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_colour2}}");
                                };

                                break;
                            case 3:


                                var switch3 = false;
                                for (var e = 0; e < scope.buurtrechtarray.length; e++) {

                                    if (scope.buurtrechtarray[e] === "3") {
                                        switch3 = true;
                                    }
                                }

                                if (switch3 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_colour2}}");
                                };

                                break;
                            case 4:

                                break;
                            case 5:

                                break;
                            case 6:

                                break;


                        }








                    }
                }

                //otherwise paint other color
                if (scope.komtvoor === false) {
                    element.attr("ng-attr-fill", "{{0.5 | map_colour2}}");
                }



                /*
                                // NOTE todo colour testing// THIS IS THE MAKING OF THE MAPS // WORKS
                                // use a switch to determine what kind of map should be drawn

                                var eventesten = Math.floor(Math.random() * 4) + 1

                                switch (apis.currentMap) {
                                    case 1:
                                        if (eventesten === 1) {
                                            element.attr("ng-attr-fill", "{{1.0 | map_colour}}");
                                        } else if (eventesten === 2) {
                                            element.attr("ng-attr-fill", "{{0.9 | map_colour}}");
                                        } else if (eventesten === 3) {
                                            element.attr("ng-attr-fill", "{{0.8 | map_colour}}");
                                        } else if (eventesten === 4) {
                                            element.attr("ng-attr-fill", "{{0.7 | map_colour}}");
                                        }
                                        break;
                                    case 2:
                                        if (eventesten === 1) {
                                            element.attr("ng-attr-fill", "{{0.5 | map_colour}}");
                                        } else if (eventesten === 2) {
                                            element.attr("ng-attr-fill", "{{0.6 | map_colour}}");
                                        } else if (eventesten === 3) {
                                            element.attr("ng-attr-fill", "{{0.7 | map_colour}}");
                                        } else if (eventesten === 4) {
                                            element.attr("ng-attr-fill", "{{0.8 | map_colour}}");
                                        }
                                        break;
                                    default:
                                }


                */
                // before reompiling remove gemeente id
                element.removeAttr("gemeente");
                // NOTE NOTE this are the functions clicks
                // The functions of this DIRECTIVE
                scope.gemeenteClick = function() {
                    var gem = scope.elementGem;
                    // NOTE this calls the parent scope, I WAS in scope mess
                    scope.$parent.mouseclicked(gem);
                };
                // triggered on Mouse-Enter
                scope.mouseEnter = function() {
                    var gem = scope.elementGem;
                    scope.$parent.mouseoverselection(gem);
                };
                scope.mouseLeaves = function() {
                    var gem = scope.elementGem;
                    scope.$parent.mouseremoveselection(gem);
                };
                scope.regionMouseOver = function() { //<
                    scope.hoverRegion = scope.elementId; //<--- Add this
                    element[0].parentNode.appendChild(element[0]); //<
                    console.log("Is Hoverrr");
                };

                // NOTE rewrite is needed
                $compile(element)(scope);

            }
        } // NOTE below is the filter for the map colour
    }).filter('map_colour', [function() {
        return function(input) {
            var b = 255 - Math.floor(input * 255);
            var g = Math.floor(input * 255);
            return "rgba(255," + g + "," + b + ",1)";

        }
    }]).filter('map_colour2', [function() {
        return function(input) {
            return "rgba(248, 225, 225, 1)";

        }
    }]);;
