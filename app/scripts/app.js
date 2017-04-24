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
        'scrollto',
        'dibari.angular-ellipsis',
        'sn.addthis'
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
            templateUrl: 'images/Nederland2016_.svg',
            link: function(scope, element, attrs) {}
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
                        $compile(element)(scope);
                    }
                    if (scope.$parent.hoverRegionLast === scope.elementGem) {
                        element.removeAttr("class");
                        //element.attr("ng-attr-stroke", "black");
                        $compile(element)(scope);
                    }
                });
                // count aantal buurtrechten & paint
                scope.komtvoor = false;
                // NOTE painting the svg elements.
                for (var i = 0; i < apis.serGemeenten.length; i++) {
                    if (apis.serGemeenten[i].name === scope.elementGem) {
                        scope.komtvoor = true;
                        scope.buurtrechtarray = apis.serGemeenten[i].buurtrecht.split(',');
                        switch (apis.currentMap) {
                            case 0:
                                if (scope.buurtrechtarray.length === 1 && scope.buurtrechtarray[0] === "") {
                                    element.attr("ng-attr-fill", "{{1 | map_colour1}}");
                                } else {
                                    switch (scope.buurtrechtarray.length) {
                                        case 1:
                                            element.attr("ng-attr-fill", "{{1 | map_colour1}}");
                                            break;
                                        case 2:
                                            element.attr("ng-attr-fill", "{{1 | map_colour2}}");
                                            break;
                                        case 3:
                                            element.attr("ng-attr-fill", "{{1 | map_colour3}}");
                                            break;
                                        case 4:
                                            element.attr("ng-attr-fill", "{{1 | map_colour4}}");
                                            break;
                                        case 5:
                                            element.attr("ng-attr-fill", "{{1 | map_colour5}}");
                                            break;
                                        case 6:
                                            element.attr("ng-attr-fill", "{{1 | map_colour6}}");
                                            break;
                                        default:
                                    }
                                }

                                break;
                            case 1:
                                var switch1 = false;
                                for (var q = 0; q < scope.buurtrechtarray.length; q++) {
                                    if (scope.buurtrechtarray[q] === "1") {
                                        switch1 = true;
                                    }
                                }
                                if (switch1 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour4}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_coloursec}}");
                                };
                                break;
                            case 2:
                                var switch2 = false;
                                for (var w = 0; w < scope.buurtrechtarray.length; w++) {

                                    if (scope.buurtrechtarray[w] === "2") {
                                        switch2 = true;
                                    }
                                }

                                if (switch2 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour4}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_coloursec}}");
                                };
                                break;
                            case 3:
                                var switch3 = false;
                                for (var r = 0; r < scope.buurtrechtarray.length; r++) {

                                    if (scope.buurtrechtarray[r] === "3") {
                                        switch3 = true;
                                    }
                                }

                                if (switch3 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour4}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_coloursec}}");
                                };
                                break;
                            case 4:
                                var switch4 = false;
                                for (var e = 0; e < scope.buurtrechtarray.length; e++) {

                                    if (scope.buurtrechtarray[e] === "4") {
                                        switch4 = true;
                                    }
                                }
                                if (switch4 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour4}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_coloursec}}");
                                };
                                break;
                            case 5:
                                var switch5 = false;
                                for (var t = 0; t < scope.buurtrechtarray.length; t++) {

                                    if (scope.buurtrechtarray[t] === "5") {
                                        switch5 = true;
                                    }
                                }
                                if (switch5 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour4}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_coloursec}}");
                                };
                                break;
                            case 6:
                                var switch6 = false;
                                for (var y = 0; y < scope.buurtrechtarray.length; y++) {

                                    if (scope.buurtrechtarray[y] === "6") {
                                        switch6 = true;
                                    }
                                }
                                if (switch6 === true) {
                                    element.attr("ng-attr-fill", "{{0.7 | map_colour4}}");
                                } else {
                                    element.attr("ng-attr-fill", "{{0.5 | map_coloursec}}");
                                };
                                break;
                        }
                    }
                }

                //otherwise paint other color
                if (scope.komtvoor === false) {
                    element.attr("ng-attr-fill", "{{0.5 | map_coloursec}}");
                    element.attr("ng-attr-stroke", "black");
                    
                }
                //randomizing the elements
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
                };
                // NOTE rewrite is needed
                $compile(element)(scope);

            }
        } // NOTE below is the filter for the map colour
    }).filter('map_colour', [function() {
        return function(input) {
            var r = 20 - Math.floor(input * 20);
            var b = 103 - Math.floor(input * 103);
            var g = Math.floor(input * 99);
            return "rgba(" + r + "," + g + "," + 99 + ",1)";
        }
    }]).filter('map_coloursec', [function() {
        return function(input) {
            return "RGB(255, 245, 245)";
        }
    }]).filter('map_colour6', [function() {
        return function(input) {
            return "RGB(0, 13, 25)";
        }
    }]).filter('map_colour5', [function() {
        return function(input) {
            return "RGB(0, 51, 102)";
        }
    }]).filter('map_colour4', [function() {
        return function(input) {
            return "RGB(0, 90, 179)";
        }
    }]).filter('map_colour3', [function() {
        return function(input) {
            return "RGB(0, 128, 255)";
        }
    }]).filter('map_colour2', [function() {
        return function(input) {
            return "RGB(77, 166, 255)";
        }
    }]).filter('map_colour1', [function() {
        return function(input) {
            return "RGB(153, 204, 255)";
        }
    }]);
