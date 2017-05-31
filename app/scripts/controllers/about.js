'use strict';

/**
 * @ngdoc function
 * @name lsamapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lsamapApp
 */
angular.module('lsamapApp')
  .controller('AboutCtrl', function ($timeout, $http, $sce, apis) {



    this.mailsend = false;

    var self = this;
    // NOTE NOTE Important
    //var nwlink = './api/';
    var nwlink = 'http://localhost:80/lsamap/app/api/';


    // getting the 'buurtrechten text
    apis.getApi().then(function (dataResponse) {
      self.about = dataResponse.data[3];
      console.log(self.about);
      //NOTE getting all the texts;
      //console.log(self.about[0].text1);
    });


    this.showFullText = function (numb) {
      console.log(numb);


      switch (numb) {
        case 1:
          self.curtitle = "Beheer van voorzieningen";
          self.curimglink = "images/2.png";
          self.curfulltext = self.about[0].text1;
          break;
        case 2:
          self.curtitle = "Toegang tot geld";
          self.curimglink = "images/3.png";
          self.curfulltext = self.about[0].text2;
          break;
        case 3:
          self.curtitle = "Open Overheid";
          self.curimglink = "images/5.png";
          self.curfulltext = self.about[0].text3;
          break;
        case 4:
          self.curtitle = "Zelfgekozen ondersteuning";
          self.curimglink = "images/6.png";
          self.curfulltext = self.about[0].text4;
          break;
        case 5:
          self.curtitle = "Maatschappelijk aanbesteden";
          self.curimglink = "images/4.png";
          self.curfulltext = self.about[0].text5;
          break;
        case 6:
          self.curtitle = "Plannen voor de buurt";
          self.curimglink = "images/1.png";
          self.curfulltext = self.about[0].text6;
          break;
      }
      $("#myModal").modal();

    }

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
        this.myPromise.then(function (data) {
          //console.log("contact send");
          self.mailsend = true;
        });
      } else {
        console.log("contact not complete");
      }

    }
  });