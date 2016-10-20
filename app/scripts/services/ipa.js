'use strict';

/**
 * @ngdoc service
 * @name lsamapApp.ipa
 * @description
 * # ipa
 * Service in the lsamapApp.
 */
angular.module('lsamapApp')
    .service('ipa', function($http, $timeout) {

        var self = this;

        // change for quick acces
        this.xzy = false;

        this.xyzg = function() {
            self.xzy = true;
        };

    });
