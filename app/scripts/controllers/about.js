'use strict';

/**
 * @ngdoc function
 * @name lsamapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
  .controller('AboutCtrl', function ($timeout, $http,$sce, apis) {

  

    this.mailsend = false;

   var self = this;
        // NOTE NOTE Important
        //var nwlink = './api/';
        var nwlink = 'http://localhost:80/lsamap/app/api/';


    apis.getApi().then(function (dataResponse) {
        self.about = dataResponse.data[3];
        console.log(self.about);
        //NOTE getting all the texts;
        //console.log(self.about[0].text1);
      });


  
    // Handle the contact form
    this.contactuse = function () {
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
        this.myPromise.success(function (data) {
          //console.log("contact send");
          self.mailsend = true;
        });
      } else {
        console.log("contact not complete");
      }

    }
  });