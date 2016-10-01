<?php

header('Access-Control-Allow-Origin: *');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


@$action= $request->action;
@$id = $request->id;
@$wysig = $request->wysig;

@$id = $request->id;
@$pos = $request->pos;
@$photolink = $request->photolink;
@$thumblink = $request->thumblink;
@$nl = $request->nl;
@$du = $request->du;
@$en = $request->en;

@$timestart = $request->timestart;
@$timeend = $request->timeend;

@$maintenance = $request->maintenance;
@$event = $request->event;
@$text = $request->text;
@$token= $request->token;
@$context1= $request->context1;
@$emailcontact= $request->emailcontact;

@$title = $request->title;
@$type = $request->type;

@$facebook= $request->facebook;
@$multilang= $request->multilang;
@$vis= $request->vis;

@$titlenl = $request->titlenl;
@$titledu = $request->titledu;
@$titleen = $request->titleen;

@$adres1 = $request->adres1;
@$adres2 = $request->adres2;
@$adres3 = $request->adres3;




include 'db.php';

// connect to the database
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
// a query get all the records from the users table

// for the wysig
function mynl2br($text) {
   return strtr($text, array("\r\n" => '<br />', "\r" => '<br />', "\n" => '<br />'));
}

switch ($action) {
    case "editbasis":
        $sql = "UPDATE basis SET context1 = '$context1', emailcontact = '$emailcontact',maintenance ='$maintenance',facebook ='$facebook',multilang ='$multilang' WHERE id = 0";
        break;
    case "editbasis2":
        $sql = "UPDATE basis SET adres1 = '$adres1', adres2 = '$adres2',adres3 ='$adres3' WHERE id = 0";
        break;
    case "editbasis3":
        $sql = "UPDATE ipa SET token = '$token' WHERE sec = 'wo'";
        break;
    case "edittab":
        $nlsafe = mynl2br($nl);
        $sql = "UPDATE sections SET  nl = '$nl', en = '$en',du ='$du', titlenl = '$titlenl', titledu = '$titledu', titleen = '$titleen' WHERE id = '$id'";
        break;
    case "newtab":
        $sql = "INSERT INTO sections (nl,en,du,titlenl,titledu,titleen) VALUES ('$nl','$en','$du','$titlenl','$titledu','$titleen')";
        break;
    case "removetab":
        $sql = "DELETE FROM sections WHERE id = '$id'";
        break;
    case "addbooking":
        $sql = "INSERT INTO booking (title,type,startevent,endevent) VALUES ('$title','$type','$timestart ','$timeend')";
        break;
    case "removebooking":
        $sql = "DELETE FROM booking WHERE id = '$id'";
        break;
    case "removephoto":
        $sql = "DELETE FROM photo WHERE id = '$id'";
        break;
    case "savebuurt":
        $sql = "UPDATE buurt SET title = '$title', text = '$text',photolink ='$photolink' WHERE id = '$id'";
        break;
    case "savenews":
        $sql = "UPDATE news SET textnl = '$nl', textdu = '$en',texten ='$en',vis ='$vis' WHERE id = 0";
        break;
}

// use prepared statements, even if not strictly required is good practice
$stmt = $dbh->prepare($sql);
// execute the query
$dbh = null;
$stmt->execute();

//final callback
echo $sql;


?>
