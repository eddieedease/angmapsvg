<?php
header('Access-Control-Allow-Origin: *');
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

        // NOTE collecting everything for converting
        $result = array();
        array_push($result, $resultipa);
        // convert it all to jSON TODO change result
        $json = json_encode($result);
        // undo PDO connection
        $dbh = null;
        // echo the json string
        echo $json;
