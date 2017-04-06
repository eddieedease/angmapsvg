# LSAMap Buurtrechten

This is an Angular 1.4 app With a Custom Directive, Connected via a mini API written in PHP, that communicaties with a MYSQL backend. Development has been done through NODEJS. Uses npm and bower for package management. Uses grunt for building a minified/ threeshaken build

#Install


1.
Needed before install
- NODEJS & NPM Installed
- BOWER Installed
- RUBY & Compass (SASS) http://compass-style.org/install/
- Apache (Php support) & Mysql      *MAMP/Shared host possible*
- Import the MYSQL file into a newly made Datase

Ready?


2.
Copy the source code, or just use git and clone http://github.com/eddieedease/angmapsvg.git


3.
Use these commands to make everything up & Running

a. 
npm install jshint && npm install grunt
b
npm install && bower install


////
3.
Now you can serve the app on your local computer with the command:
grunt serve

Use command:
grunt build

To build the project! 


!! In the build (/dist/ folder, CHANGE THE 'API/db.php' data to match mysql!


install with 'npm install && bower install'


IMPORTANT
CORS are set up on server files, for testing purposes. If production --> disable for safety
