<?php header('Access-Control-Allow-Origin: *');
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);
@$wwww = $request->wwww;
$www = md5($wwww);
include 'db.php';
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
$sqlipa = 'SELECT * FROM api';
$stmtipa = $dbh->prepare($sqlipa);
$stmtipa->execute();
$resultipa = $stmtipa->fetchAll(PDO::FETCH_ASSOC);
foreach ($resultipa as $row) {
            $ww = $row['ww'];
        };
if ($www == $ww) {
echo $ww;
} else {
$owj = 'reject';
echo $owj;
}
$dbh = null;
