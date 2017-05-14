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
@$tokennew = $request->tokennew;

$tokenm5 = md5($token);

@$emailcontact = $request->emailcontact;

@$title = $request->title;
@$type = $request->type;

@$b1 = $request->b1;
@$b2 = $request->b2;
@$b3 = $request->b3;
@$b4 = $request->b4;
@$b5 = $request->b5;
@$b6 = $request->b6;


// Sooooo.... escape the wysig
//$wysig = $mysqli->real_escape_string($wysig);

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

$wysig = str_replace("'", "''", $wysig);
//$wysig = mysqli_escape_string($wysig);

if ($tokenm5 == $ww) {
  switch ($action) {
      case 'editbasis': //TODO
          $sql = "UPDATE api SET usr = '$title', email = '$emailcontact' WHERE id = 1";
          break;
      case 'editbasis2':
          $sql = "UPDATE basis SET adres1 = '$adres1', adres2 = '$adres2',adres3 ='$adres3' WHERE id = 1";
          break;
      case 'editbasis3': //TODO
          $sql = "UPDATE api SET ww = '$tokennew' WHERE id = 1";
          break;
      case 'editabout': //TODO WONT WORK :()
                if ($id == 1) {
                   $abouta = 'text1'; 
                } elseif ($id == 2) {
                    $abouta = 'text2';
                } elseif ($id == 3) {
                    $abouta = 'text3';
                } elseif ($id == 4) {
                    $abouta = 'text4';
                } elseif ($id == 5) {
                    $abouta = 'text5';
                } elseif ($id == 6) {
                    $abouta = 'text6';
                }  elseif ($id == 7) {
                    $abouta = "text7";
                };   
          $sql = "UPDATE about SET $abouta = '$wysig' WHERE id = 1";
          break;
      case 'newgemeente':
          // NEED - id gemeente, wysigtekst
          //$nlsafe = mynl2br($nl);
          $sql = "INSERT INTO gemeenten (name,wysig,b1,b2,b3,b4,b5,b6,buurtrecht) VALUES ('$name','$wysig','$b1','$b2','$b3','$b4','$b5','$b6','$buurtrechten')";
          break;
      case 'editgemeente':
          // NEED - id gemeente, wysigtekst
          //$nlsafe = mynl2br($nl);
          $sql = "UPDATE gemeenten SET  name = '$name', wysig = '$wysig', b1 = '$b1', b2 = '$b2', b3 = '$b3', b4 = '$b4', b5 = '$b5', b6 = '$b6',buurtrecht ='$buurtrechten' WHERE id = '$id'";
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
  //echo "asdadadadsa";
}




// Escape some shit



// for the wysig
