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
        'angular-svg-round-progressbar'
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
                scope.rewritesdone = false;
                scope.elementGem = element.attr("gem");
                // TODO TODO TODO remove
                scope.$parent.collectGemeenten(scope.elementGem);

                element.attr("ng-click", "gemeenteClick()");
                element.attr("ng-mouseenter", "mouseEnter()");
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
                        element.removeAttr("class");

                        console.log(scope.$parent.hoverRegionLast);
                        $compile(element)(scope);
                    }
                });

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
                // before reompiling remove gemeente id
                element.removeAttr("gemeente");

                // NOTE NOTE this are the functions clicks

                //Loading Bar
                // The functions of this DIRECTIVE


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

                scope.regionMouseOver = function() { //<
                    scope.hoverRegion = scope.elementId; //<--- Add this
                    element[0].parentNode.appendChild(element[0]); //<
                    console.log("Is Hoverrr");
                };




                // NOTE rewrite
                $compile(element)(scope);


            }
        } // NOTE below is the filter for the map colour
    }).filter('map_colour', [function() {
        return function(input) {
            var b = 255 - Math.floor(input * 255);
            var g = Math.floor(input * 255);
            return "rgba(255," + g + "," + b + ",1)";
        }
    }]);;
