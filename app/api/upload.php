<?php

header('Access-Control-Allow-Origin: *');

if ($_FILES['file']['name']) {
    $filename = $_FILES['file']['name'];
    $destination = '../uploads/'.date('y').date('j').date('H').date('s').(string) $filename;
    $destination2 = './uploads/'.date('y').date('j').date('H').date('s').(string) $filename;
    move_uploaded_file($_FILES['file']['tmp_name'], $destination);

  // update the db
  include 'db.php';
  // connect to the database
  $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
  // a query get all the records from the users table
  $sql = "INSERT INTO photo (photolink) VALUES ('$destination2')";
  // use prepared statements, even if not strictly required is good practice
  $stmt = $dbh->prepare($sql);
  // execute the query
  $dbh = null;
    $stmt->execute();
}
