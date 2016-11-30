'use strict';

/**
 * @ngdoc function
 * @name lsamapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
  .controller('AboutCtrl', function ($timeout, $http) {

    var self = this;

    this.mailsend = false;

    //qvar nwlink = './api/';
    var nwlink = 'http://localhost:80/lsamap/app/api/';

    // Handle the contact form
    this.contactuse = function() {
      console.log("Trying to send mail");
      if (self.naamm !== null && self.usemail !== null && self.onderwerpp !== null && self.berichtt !== null) {
        this.myPromise = $http({
          method: "post",
          url: nwlink + 'email.php',
          data: {
            naam: self.naamm,
            email: self.usemail,
            onderwerp: self.onderwerpp,
            bericht: self.berichtt
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        /* Check whether the HTTP Request is Successfull or not. */
        this.myPromise.success(function(data) {
          // TODO show that the contact form is send
          //console.log("contact send");
          self.mailsend = true;
        });
      } else {
        console.log("contact not complete");
      }

    }
  });
