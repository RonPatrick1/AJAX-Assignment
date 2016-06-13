<?php

function connect() {
    $connection = new mysqli("127.0.0.1", "tempAccount", "tempApassword", "mysql");
    //$connection = new mysqli("127.0.0.1", "patricro", "patricro", "patricro");
    if (!$connection || $connection->connect_error) {
        die('Unable to connect to database [' . $connection->connect_error . ']');
    }
    return $connection;
}

header('Content-Type: text/xml');
$xmlDoc = new DomDocument();
echo "<events>\n";
if(isset($_GET["date"])) {
    $date=$_GET["date"];
    $title=$_GET["title"];
    $conn=connect();
    $sql="select * from Events where Date='".$date."' and Title='".$title."'";
    $result = $conn->query($sql);
    if ($result->num_rows>0) {
        foreach($result as $row) {
            echo "<event>\n";
            echo "<date>".$date."</date>\n";
            echo "<title>".$row["Title"]."</title>\n";
            echo "<startTime>".$row["StartTime"]."</startTime>\n";
            echo "<stopTime>".$row["StopTime"]."</stopTime>\n";
            echo "<desc>".$row["Description"]."</desc>\n";
            echo "</event>\n";
        }
    }
    $conn->close();
}
echo "</events>\n";
?>
