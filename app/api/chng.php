<?php

header('Access-Control-Allow-Origin: *');

$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

// mysql tables are: api, gemeenten, instrument, uploads
// TODO IMPORTANT TODO TODO Get validation from server side, aka save username and pw & check
// TODO VALIDATION FIRST // TODO VALIDATION

@$action = $request->action;
@$id = $request->id;
@$wysig = $request->wysig;
@$name = $request->name;
@$buurtrechten = $request->buurtrechten;
@$gemeenten = $request->gemeenten;
@$id = $request->id;



@$pos = $request->pos;
@$photolink = $request->photolink;
@$thumblink = $request->thumblink;

@$timestart = $request->timestart;

@$text = $request->text;
@$token = $request->token;

$tokenm5 = md5($token);

@$emailcontact = $request->emailcontact;

@$title = $request->title;
@$type = $request->type;

include 'db.php';

// connect to the database
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

$sqlipa = 'SELECT * FROM api';
$stmtipa = $dbh->prepare($sqlipa);
$stmtipa->execute();
$resultipa = $stmtipa->fetchAll(PDO::FETCH_ASSOC);
foreach ($resultipa as $row) {
            $ww = $row['ww'];
        };

function mynl2br($text)
{
    return strtr($text, array("\r\n" => '<br />', "\r" => '<br />', "\n" => '<br />'));
}



if ($tokenm5 == $ww) {
  switch ($action) {
      case 'editbasis': //TODO
          $sql = "UPDATE basis SET context1 = '$context1', emailcontact = '$emailcontact',maintenance ='$maintenance',facebook ='$facebook',multilang ='$multilang' WHERE id = 0";
          break;
      case 'editbasis2': //TODO
          $sql = "UPDATE basis SET adres1 = '$adres1', adres2 = '$adres2',adres3 ='$adres3' WHERE id = 0";
          break;
      case 'editbasis3': //TODO
          $sql = "UPDATE ipa SET token = '$token' WHERE sec = 'wo'";
          break;
      case 'newgemeente':
          // NEED - id gemeente, wysigtekst
          //$nlsafe = mynl2br($nl);
          $sql = "INSERT INTO gemeenten (name,wysig,buurtrecht) VALUES ('$name','$wysig','$buurtrechten')";
          break;
      case 'editgemeente':
          // NEED - id gemeente, wysigtekst
          //$nlsafe = mynl2br($nl);
          $sql = "UPDATE gemeenten SET  name = '$name', wysig = '$wysig',buurtrecht ='$buurtrechten' WHERE name = '$name'";
          break;
      case 'newinstrument': //TODO
          // title, wysigtekst, link, buurtrechtenlink
          //$nlsafe = mynl2br($nl);
          $sql = "INSERT INTO instrument (name,wysig,gemeentenlink,link) VALUES ('$name','$wysig','$gemeenten','$buurtrechten')";
          break;
      case 'editinstrument': //TODO
          // title, wysigtekst, link, buurtrechtenlink
          //$nlsafe = mynl2br($nl);
          $sql = "UPDATE instrument SET  name = '$name', wysig = '$wysig',gemeentenlink ='$gemeenten',link ='$buurtrechten' WHERE id = '$id'";
          break;
      case 'removeinstrument': //TODO
          $sql = "DELETE FROM instrument WHERE id = '$id'";
          break;
      case 'removephoto': //TODO
          $sql = "DELETE FROM uploads WHERE id = '$id'";
          break;
      case 'savenews': //TODO
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
}




// Escape some shit



// for the wysig
