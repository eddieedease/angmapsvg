<?php

header('Access-Control-Allow-Origin: *');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

@$naam = $request->naam;
@$email= $request->email;
@$onderwerp= $request->onderwerp;
@$bericht = $request->bericht;
@$sendto= $request->sendto;

$from_mail = $naam.'<'.$email.'>';

$to = "info@lodgeaanzee.nl"; // this is your Email address
$subject = "CHALET contactformulier";
$message = $naam . " heeft je contactformulier ingevuld:" . "\n\n" . $bericht. "\n\n".$email;

//$headers = "Van:" . $naam;
$headers = 'Chalet | ontvangen van: ' . $from_mail . "\r\n";

mail($to,$subject,$message,$headers);    //mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
echo "Mail is verstuurd, dankjewel! " . $naam . ", we nemen zo snel we kunnen contact met je op.";
// You can also use header('Location: thank_you.php'); to redirect to another page.
?>
