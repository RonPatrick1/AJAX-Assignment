<?php

function connect() {
    //$connection = new mysqli("127.0.0.1", "tempAccount", "tempApassword", "mysql");
    $connection = new mysqli("127.0.0.1", "patricro", "patricro", "patricro");
    if (!$connection || $connection->connect_error) {
        die('Unable to connect to database [' . $connection->connect_error . ']');
    }
    return $connection;
}

if(isset($_GET["month"])) {
	header('Content-Type: text/xml');
	$xmlDoc = new DomDocument();
	echo "<events>\n";
	$month=$_GET["month"];
	$year=$_GET["year"];
	$days=$_GET["days"];
	$conn=connect();
	for($x=1;$x<=$days;$x++) {
		$date=$month."/".$x."/".$year;
		$sql="select Title from Events where Date='".$date."'";
		$result = $conn->query($sql);
		if ($result->num_rows>0) {
		    foreach($result as $row) {
			    echo "<event>\n";
			    echo "<date>".$date."</date>\n";
			    echo "<title>".$row["Title"]."</title>\n";
			    echo "</event>\n";
		    }
		}
	}
	$conn->close();
	echo "</events>\n";
} else {
	header("Location: calendar.php");
}
?> 
