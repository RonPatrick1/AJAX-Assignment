<?php

function connect() {
    $connection = new mysqli("127.0.0.1", "tempAccount", "tempApassword", "mysql");
    //$connection = new mysqli("127.0.0.1", "patricro", "patricro", "patricro");
    if (!$connection || $connection->connect_error) {
        die('Unable to connect to database [' . $connection->connect_error . ']');
    }
    return $connection;
}

function insert($date,$title,$start,$stop,$desc) {
    $sql="insert into Events (Date, Title, StartTime, StopTime, Description) values ('";
    $sql.=$date."', '";
    $sql.=$title."', '";
    $sql.=$start."', '";
    $sql.=$stop."', '";
    $sql.=$desc."')";
    return $sql;
}

if(isset($_POST["new"])) {
    $title = filter_var($_POST["eventTitle"], FILTER_SANITIZE_STRING);
    $date = filter_var($_POST["eventDate"], FILTER_SANITIZE_STRING);
    if($title=="" || $date=="") {
        header("Location: calendar.php?month=".$_POST['month']."&year=".$_POST['year']);
        return;
    }
    $conn=connect();
    $start = filter_var($_POST["eventStart"], FILTER_SANITIZE_STRING);
    $stop = filter_var($_POST["eventEnd"], FILTER_SANITIZE_STRING);
    $desc = filter_var($_POST["eventDescription"], FILTER_SANITIZE_STRING);
    if($_POST["new"]=="true") {
        $sql=insert($date,$title,$start,$stop,$desc);
    }
    else {
        if ($_POST['action'] == 'Delete') {
            $sql="delete from Events where Date='".$_POST['oldDate']."' and Title='".$_POST['oldTitle']."'";
        }
        else {
            if($date==$_POST["oldDate"] && $title==$_POST["oldTitle"]) {
                $sql="update Events set StartTime='";
                $sql.=$start."', StopTime='";
                $sql.=$stop."', Description='";
                $sql.=$desc."' where Date='";
                $sql.=$date."' and Title='".$title."'";
            }
            else {
                $sql="delete from Events where Date='".$_POST['oldDate']."' and Title='".$_POST['oldTitle']."'";
                if ($conn->query($sql) === FALSE) {
                    echo "<p align=\"center\">Error deleting row: " . $conn->error."</p><br>";
                }
                $sql=insert($date,$title,$start,$stop,$desc);
            }
        }
    }
    if ($conn->query($sql) === FALSE) {
        echo "<p align=\"center\">Error inserting row: " . $conn->error."</p>";
        $conn->close();
    }
    else {
        $conn->close();
        header("Location: calendar.php?month=".$_POST['month']."&year=".$_POST['year']);
    }
}

?>
