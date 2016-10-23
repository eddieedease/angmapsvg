<?php

  header('Access-Control-Allow-Origin: *');

  $postdata = file_get_contents('php://input');
  $request = json_decode($postdata);

  @$wwww = $request->wwww;

  $www = md5($wwww);

  // set up the connection variables
  include 'db.php';
        // connect to the database
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        // NOTE fixing the api over here
        // NOTE 1 pieces [0] ipa

        //NOTE IPA
        // a query get all the correct records from the users table
        $sqlipa = 'SELECT * FROM api';
        // use prepared statements, even if not strictly required is good practice
        $stmtipa = $dbh->prepare($sqlipa);
        // execute the query
        $stmtipa->execute();
        // fetch the results into an array
        $resultipa = $stmtipa->fetchAll(PDO::FETCH_ASSOC);
        foreach ($resultipa as $row) {
            $ww = $row['ww'];
        }

        //first off close connection
        $dbh = null;

        // only pass when pwd is correct
        if ($www == $ww) {
            echo $ww;
        } else {
          echo "reject";
        }

        // echo the json string
