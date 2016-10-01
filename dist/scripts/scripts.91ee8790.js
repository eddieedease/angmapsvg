"use strict";var app=angular.module("lsamapApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","selector","angular-md5","ui.tinymce","cgBusy"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/minad",{templateUrl:"views/minad.html",controller:"MinadCtrl",controllerAs:"minad"}).otherwise({redirectTo:"/"})}]).directive("svgMap",["$compile","apis",function(a,b){return{restrict:"A",templateUrl:"images/Nederland2016.svg",link:function(a,b,c){}}}]).directive("gemeente",["$compile","apis",function(a,b){return{restrict:"A",transclude:!0,scope:{},link:function(c,d,e){c.rewritesdone=!1,c.elementGem=d.attr("gem"),c.$parent.collectGemeenten(c.elementGem),d.attr("ng-click","gemeenteClick()"),d.attr("ng-mouseenter","mouseEnter()"),d.attr("mouseoverselection","mouseoverselection"),c.$parent.$watch("hoverRegion",function(){c.$parent.hoverRegion===c.elementGem&&(d.attr("ng-class","{active:true}"),console.log(c.$parent.hoverRegion),a(d)(c)),c.$parent.hoverRegionLast===c.elementGem&&(d.removeAttr("class"),console.log(c.$parent.hoverRegionLast),a(d)(c))});var f=Math.floor(4*Math.random())+1;switch(b.currentMap){case 1:1===f?d.attr("ng-attr-fill","{{1.0 | map_colour}}"):2===f?d.attr("ng-attr-fill","{{0.9 | map_colour}}"):3===f?d.attr("ng-attr-fill","{{0.8 | map_colour}}"):4===f&&d.attr("ng-attr-fill","{{0.7 | map_colour}}");break;case 2:1===f?d.attr("ng-attr-fill","{{0.5 | map_colour}}"):2===f?d.attr("ng-attr-fill","{{0.6 | map_colour}}"):3===f?d.attr("ng-attr-fill","{{0.7 | map_colour}}"):4===f&&d.attr("ng-attr-fill","{{0.8 | map_colour}}")}d.removeAttr("gemeente"),c.gemeenteClick=function(){var a=c.elementGem;c.$parent.mouseclicked(a)},c.mouseEnter=function(){var a=c.elementGem;c.$parent.mouseoverselection(a)},c.regionMouseOver=function(){c.hoverRegion=c.elementId,d[0].parentNode.appendChild(d[0]),console.log("Is Hoverrr")},a(d)(c)}}}]).filter("map_colour",[function(){return function(a){var b=255-Math.floor(255*a),c=Math.floor(255*a);return"rgba(255,"+c+","+b+",1)"}}]);angular.module("lsamapApp").controller("MainCtrl",["$scope","$timeout","$http","$sce","$route","apis",function(a,b,c,d,e,f){var g=this;f.getApi().then(function(a){console.log(a)}),this.curmap=f.currentMap,this.gemeenten=[],this.introtekst="Click  on something!",a.testttt=Math.random(),a.hoverRegion="",a.mouseoverselection=function(a){g.hovergemeente=a},a.mouseclicked=function(a){g.currentgemeente=a},a.collectGemeenten=function(a){var b={value:a,label:a};g.gemeenten.push(b),g.gemeenten.sort(function(a,b){return a.label<b.label?-1:a.label>b.label?1:void 0})},this.setMap=function(a){f.currentMap=a,e.reload()},this.onChangeFromList=function(b,c){console.log("Hoe vaak!"),b&&(a.currentgemeente=b.value,a.hoverRegion=b.value,c&&(a.hoverRegionLast=c.value))}}]),angular.module("lsamapApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("lsamapApp").controller("AdminlsaCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("lsamapApp").service("apis",["$http","$timeout",function(a,b){this.getMapData=function(){return[{id:"1",name:"Iemand",color:"color1"},{id:"2",name:"anders",color:"color2"}]},this.service1="owheywwweye",this.currentMap=1;var c="http://localhost:80/lsamap/app/api/";this.getApi=function(){return a({method:"GET",url:c+"api.php",params:{woobar:(new Date).getTime()},cache:!1}).success(function(a,b,c,d){})},this.ipa=function(){return a({method:"GET",url:c+"ipa.php",params:{woobar:(new Date).getTime()},cache:!1}).success(function(a,b,c,d){})}}]),angular.module("lsamapApp").controller("MinadCtrl",["$scope","$timeout","$route","apis","md5",function(a,b,c,d,e){var f=this;this.md5message="Your pwd encryption is: "+e.createHash("goudvis"),this.tinymceModel="Boe",f.body="<div>  </div>",this.curmap=d.currentMap,this.wrongpwtext="",this.gemeenten=[],this.minn=!0,this.minnn=!1,this.tinymceOptions={extended_valid_elements:"iframe[src|frameborder|style|scrolling|class|width|height|name|align]",theme:"modern",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime nonbreaking save table contextmenu directionality","emoticons template paste textcolor code"],toolbar1:"insertfile undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link",toolbar2:"styleselect forecolor backcolor | link | code",image_advtab:!0,relative_urls:!1,height:"300px",width:"100%",menubar:!1},a.mouseoverselection=function(a){f.hovergemeente=a},a.mouseclicked=function(a){console.log(a+"clicked"),f.currentgemeente=a},a.collectGemeenten=function(a){var b={value:a,label:a};f.gemeenten.push(b),f.gemeenten.sort(function(a,b){return a.label<b.label?-1:a.label>b.label?1:void 0}),console.log()},this.setMap=function(a){d.currentMap=a,c.reload()},this.inlogger=function(){"Admin"===this.user&&"goudvis"===this.userpw?(this.wrongpwtext="Alllright Good",this.minn=!1,this.minnn=!0):this.wrongpwtext="Fout"}}]),angular.module("lsamapApp").service("ipa",function(){}),angular.module("lsamapApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="jumbotron jum-b"> <div class="container"> <h1>Over</h1> <p>Wat kun je met de kaart</p> <small>En over ons</small> </div> </div>'),a.put("views/adminlsa.html","<p>This is the adminlsa view.</p>"),a.put("views/main.html",'<div class="jumbotron jum-b"> <div class="container"> <h1>Gemeenten in Kaart</h1> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p> <small>LSAmap</small> </div> </div> <div class="section"> <div class="container"> <div class="row"> <div class="col-md-12"> <hr> </div> </div> </div>  <div class="container"> <ol class="breadcrumb breadcrumb-arrow"> <li> <a href="#">Home</a> </li> <li> <a href="#">Buurtrechten</a> </li> <li> <a href="#">Gemeente</a> </li> <li> <a href="#">Instrument</a> </li> </ol> </div> <div class="section"> <div class="container-fluid"> <div class="row"> <div class="col-md-5"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Info</h3> </div> <div class="panel-body"> <div class="form-group"> <div class="radio"> <label> <input type="radio" name="radio1" value="1" ng-model="main.curmap" ng-change="main.setMap(1)"> Overzicht kaart </label> </div> <div class="radio"> <label> <input type="radio" name="radio2" value="2" ng-model="main.curmap" ng-change="main.setMap(2)"> Buurtrechten </label> </div> </div> <!--<p>\n              <button ng-click="createDummyData()" class="btn btn-block btn-default">Test Data</button>\n            </p>\n            <div class="regionlist">\n              <div ng-repeat="(key,gemeente) in dummyData">\n                <div>{{key}}</div>\n                <div>{{gemeente.value | number}}</div>\n              </div>\n            </div>--> <h4>Zoeken</h4> <select selector change="main.onChangeFromList(newValue, oldValue)" model="main.currentgemeente" options="main.gemeenten" value-attr="value"></select> <hr> </div> <div style="padding:20px;padding-top:0px"> <h2>{{main.currentgemeente}}</h2> <p> Lorem ipsum dolor voorbeeldtekst sit amet, consectetur adipiscing elit. Vivamus molestie convallis pretium. Vivamus risus augue, dapibus sed luctus eget, ornare id orci.<br><br> Donec condimentum faucibus placerat. Nam tortor libero, euismod at rutrum ac, lobortis consequat lorem. Nunc ut ultrices purus. Aenean auctor lacus sit amet nunc finibus volutpat./n Donec varius nec nisi at fermentum. Sed accumsan lorem ac enim semper faucibus. </p> </div> </div> </div> <div class="col-md-7"> <h3> {{main.hovergemeente}}</h3> <div svg-map></div> </div> </div> </div> <div class="section"> <div class="container"> <div class="row"> <div class="col-md-4"> <div class="thumbnail"> <div class="caption"> <h3>Info</h3> <ul class="media-list main-list"> <li class="media"> <a class="pull-left" href="#"> <img class="media-object" src="http://placehold.it/150x90" alt="..."> </a> <div class="media-body"> <h4 class="media-heading">Some news/h4> <p class="by-author">...</p> </h4></div> </li> </ul> </div> </div> </div><div class="col-md-4"> <div class="thumbnail"> <div class="caption"> <h3>Laatst bijgewerkt</h3> <ul class="media-list main-list"> <li class="media"> <div class="media-body"> <h4 class="media-heading">Gemeente</h4> <p class="by-author">Buurtrecht</p> </div> <div class="media-body"> <h4 class="media-heading">Gemeente</h4> <p class="by-author">Buurtrecht</p> </div> </li> </ul> </div> </div> </div><div class="col-md-4"> <div class="thumbnail"> <div class="caption"> <h3>Random</h3> <ul class="media-list main-list"> <li class="media"> <a class="pull-left" href="#"> <img class="media-object" src="http://placehold.it/150x90" alt="..."> </a> <div class="media-body"> <h4 class="media-heading">Something Random</h4> <p class="by-author">Gemeente</p> </div> </li> </ul> </div> </div> </div> </div> </div> </div> </div> <div class="container"> <div class="row" style="margin-top:60px !important"> <div class="col-md-12"> <div class="box box-widget"> <div class="box-header with-border"> <div class="user-block"> <img class="img-circle" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="User Image"> <span class="username"> <a href="#">Instrumentnaam</a> </span> <span class="description">Jupju</span> </div> <div class="box-tools"> <button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="" data-original-title="Mark as read"> <i class="fa fa-circle-o"></i> </button> <button type="button" class="btn btn-box-tool" data-widget="collapse"> <i class="fa fa-minus"></i> </button> <button type="button" class="btn btn-box-tool" data-widget="remove"> <i class="fa fa-times"></i> </button> </div> </div> <div class="box-body"> <p>Hier kunnen we het instrument beschrijven</p> <p>En alle info inzetten, enz enz</p> <div class="attachment-block clearfix"> <img class="attachment-img" src="http://lorempixel.com/400/300/nature/4/" alt="Attachment Image"> <div class="attachment-pushed"> <h4 class="attachment-heading"> <a href="http://www.lipsum.com/">Lorem ipsum text generator</a> </h4> <div class="attachment-text"> Foto omschrijving </div> </div> </div> <button type="button" class="btn btn-default btn-xs"> <i class="fa fa-share"></i> Link naar website</button> <span class="pull-right text-muted">Laatst bijgewerkt : </span> </div> <div class="box-footer"> <h5>Coffee 2 Code</h5> </div> </div> </div> </div> </div> <footer class="section"> <div class="container"> <div class="row"> <div class="col-sm-6"> <h1>Footer</h1> <p>Lorum ipsum <br> <br>^^ Beta</p> </div> <div class="col-sm-6"> <p class="text-info text-right"><br><br>asdasd</p> </div> </div> </div> </footer></div>'),a.put("views/minad.html",'<div ng-show="minad.minn" class="section"> <div class="wrapper"> <form class="form-signin"> <h2 class="form-signin-heading">Hier inloggen</h2> <code>User: Admin</code><br> <code>Password: goudvis</code> <hr> <input ng-model="minad.user" type="text" class="form-control" name="username" placeholder="Gebruikersnaam" required autofocus> <input ng-model="minad.userpw" type="password" class="form-control" name="password" placeholder="Wachtwoord" required> {{minad.wrongpwtext}} <button class="btn btn-lg btn-dangerbtn-block" ng-click="minad.inlogger()" type="submit">Inloggen</button> </form> </div> </div> <div ng-show="minad.minnn" class="section"> <div class="jumbotron jum-b"> <div class="container"> <h1>ADMIN superpowers</h1> <small>Voor het aanpassen van de kaart</small> </div> </div> <div class="section"> <div class="container-fluid"> <div class="row"> <div class="col-md-7"> <h3>{{minad.hovergemeente}}</h3> <div svg-map></div> </div> <div class="col-md-5"> </div> <div class="col-md-5"> <div class="panel panel-danger"> <div class="panel-heading">Selectie</div> <div class="panel-body"> <h4>Lijst select - (Met suggestie)</h4> <div class="form-group"> <select selector model="minad.currentgemeente" options="minad.gemeenten" value-attr="value"></select></div> <h4>Soort map</h4> <div class="radio"> <label> <input type="radio" name="radio1" value="1" ng-model="minad.curmap" ng-change="minad.setMap(1)"> Overzicht kaart </label> </div> <div class="radio"> <label> <input type="radio" name="radio2" value="2" ng-model="minad.curmap" ng-change="minad.setMap(2)"> Buurtrechten </label> </div> </div> <textarea ui-tinymce="minad.tinymceOptions" ng-model="minad.tinymceModel"></textarea> <hr> <div> <button class="btn btn-primary center-block" type="submit">Opslaan</button> </div> </div> <!--<p>\r\n                <button ng-click="createDummyData()" class="btn btn-block btn-default">Test Data</button>\r\n              </p>\r\n              <div class="regionlist">\r\n                <div ng-repeat="(key,gemeente) in dummyData">\r\n                  <div>{{key}}</div>\r\n                  <div>{{gemeente.value | number}}</div>\r\n                </div>\r\n              </div>--> <div class="panel panel-danger"> <div class="panel-heading">Buurtrechten toewijzen</div> <div class="panel-body"> <div class="checkbox"> <label> <input type="checkbox" value="" checked> <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Buurtrecht 1 </label> </div> <div class="checkbox"> <label> <input type="checkbox" value=""> <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Buurtrecht 2 </label> </div> <div class="checkbox disabled"> <label> <input type="checkbox" value=""> <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Buurtrecht 3 </label> </div> <button class="btn btn-primary" type="submit">Opslaan</button></div> </div> <div class="panel panel-danger"> <div class="panel-heading">Instrumenten toewijzen</div> <div class="panel-body"> <div class="checkbox"> <label> <input type="checkbox" value="" checked> <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Instrument 1 </label> </div> <div class="checkbox"> <label> <input type="checkbox" value=""> <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Instrument 2 </label> </div> <div class="checkbox disabled"> <label> <input type="checkbox" value=""> <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Instrument 3 </label> </div><button class="btn btn-primary" type="submit">Opslaan</button></div> </div> </div> </div> </div> </div> </div>')}]);