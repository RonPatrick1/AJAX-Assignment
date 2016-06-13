<?php
$cTitle="";
$cColor="Blue";
if(isset($_GET["cal_title"])) {
    $cTitle=$_GET["cal_title"];
    setcookie("title", $_GET["cal_title"], time() + (86400 * 30), "/");
}
if(isset($_GET["colorArrow"])) {
    $cColor=$_GET["colorArrow"];
    setcookie("colorArrow", $_GET["colorArrow"], time() + (86400 * 30), "/");
}

function connect() {
    $connection = new mysqli("127.0.0.1", "tempAccount", "tempApassword", "mysql");
    //$connection = new mysqli("127.0.0.1", "patricro", "patricro", "patricro");
    if (!$connection || $connection->connect_error) {
        die('Unable to connect to database [' . $connection->connect_error . ']');
    }
    return $connection;
}

// This line of code can be used to override the value in php.ini and/or .htaccess
ini_set('display_errors', 1);
?>
<html>
<head>
    <!--#calendar.php - CIS 371 - Summer 2016 - Ron Patrick-->
    <meta http-equiv="Content-type" content="text/html;charset=iso-8859-1"/>
    <link rel="stylesheet" href="calendar.css" type="text/css"/>
    <title>CS 371 - Assignment 15 - Calendar Events</title>
</head>
<body>

<?php
$dArray=array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
date_default_timezone_set('America/New_York');
$pToday=0;
if(isset($_GET["month"]) && isset($_GET['year'])) {
    $pMonth = date("F", mktime(0, 0, 0, $_GET['month'], 1, 2000));
    $pYear = $_GET['year'];
} else {
    $pMonth = date("F");
    $pYear = date("Y");
}
if ($pMonth==date("F")) {
    $pToday=date("j");
}
if(isset($_COOKIE["title"]) && !isset($_GET["cal_title"])) {
    $cTitle=$_COOKIE["title"];
}
if(isset($_COOKIE["colorArrow"]) && !isset($_GET["colorArrow"])) {
    $cColor=$_COOKIE["colorArrow"];
}
if($cTitle!="" && $cTitle!="NULL") {
    echo "<h2>".$cTitle."</h2>\n";
}
echo "<h2>".$pMonth." ".$pYear."</h2>\n";
$numMonth=intval(date('m', strtotime($pMonth)));
echo "<table align=\"center\" class=\"main\">\n";
echo "<tr><td>\n";
$tDate = date_parse($pMonth);
$pPrevMonth=$tDate['month']-1;
$pNextMonth=$tDate['month']+1;
$pPrevYear=$pYear;
$pNextYear=$pYear;
if($pPrevMonth==0) {
    $pPrevMonth=12;
    $pPrevYear=$pYear-1;
}
if($pNextMonth==13) {
    $pNextMonth=1;
    $pNextYear+=1;
}
echo "<a href=\"calendar.php?month=".$pPrevMonth."&year=".$pPrevYear."\">\n";
echo "<img src=\"leftArrow";
if($cColor=="Blue") {
    $cColor="";
}
else {
    $cColor="-".$cColor;
}
echo $cColor;
echo ".png\">\n";
echo "</a>\n";
echo "</td><td>\n";
echo "<div class=\"month\">\n";
echo "<table id=\"cal\">\n";
echo "<tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr>\n";
$firstDayOfWeek=date("l", mktime(0, 0, 0, $tDate['month'], 1, $pYear));
$number = cal_days_in_month(CAL_GREGORIAN, $tDate['month'], $pYear);
$index=0;
echo "<tr>";
while ($firstDayOfWeek!=$dArray[$index]) {
    echo "<td id=\"empty\"></td>";
    $index++;
}
for ($x=1;$x<=$number;$x++) {
    $cDate=$numMonth.'/'.$x.'/'.$pYear;
    if ($x==$pToday) {
        echo '<td class="today" id="'.$cDate.'">';
    }
    else {
        echo '<td id="'.$cDate.'">';
    }
    echo $x."\t<a id=\"".$cDate."-new\" onclick=\"onClickFill(this);\" href=\"#openModal\">Add New Event</a>";
    echo "</td>";
    $index=(($index+1)%7);
    if ($index==0 && $x!=$number) {
        echo "</tr>\n<tr>";
    }
}
echo "</tr>\n</table>\n";
echo "</div>\n";
echo "</td><td>\n";
echo "<a href=\"calendar.php?month=".$pNextMonth."&year=".$pNextYear."\">\n";
echo "<img src=\"rightArrow";
echo $cColor;
echo ".png\">\n";
echo "</a>\n";
echo "</td></tr></table>\n";
echo '<p hidden id="month">'.$numMonth."</p>\n";
echo '<p hidden id="year">'.$pYear."</p>\n";
echo '<p hidden id="days">'.$number."</p>\n";
?>

<table id="selectors" align="center">
    <tr><th>Arrow Color</th><th>Calendar Title</th></tr>
    <tr><td align="center">
            <select name="colorArrow" form="form_submit">
                <option value="Blue">Blue</option>
                <option value="Purple">Purple</option>
                <option value="Yellow">Yellow</option>
                <option value="Green">Green</option>
            </select>
        </td>
        <td align="center">
            <form id="form_submit" action="calendar.php" method="get">
                <?php
                echo "<input type=\"hidden\" name=\"month\" value=".$numMonth.">\n";
                echo "<input type=\"hidden\" name=\"year\" value=".$pYear.">\n";
                ?>
                <input type="text" name="cal_title">
        </td></tr>
    <tr><td colspan="2" align="center">
            <input type="submit" value="Submit">
        </td></tr>
    </form>
    </td>
    </tr></table>

<div id="openModal" class="modalDialog" >
    <div>
        <a href="#close" title="Close" class="close">X</a>
        <h3 align="center">Event Details</h3>
        <form id="form_submit2" action="enterEvent.php" method="post">
            Event Title:<br>
            <input autofocus="autofocus" type="text" id="eventTitle" name="eventTitle" value="">
            <br>
            Date:<br>
            <input type="text" id="eventDate" name="eventDate" value="">
            <br>
            Start Time<br>
            (24-hour format)<br>
            <input type="test" id="eventStart" name="eventStart" value="">
            <br>
            End Time:<br>
            <input type="text" id="eventEnd" name="eventEnd" value="">
            <br>
            Description:<br>
            <textarea id="eventDescription" name="eventDescription" rows="4" cols="45" form="form_submit2" value=""></textarea>
            <br>
            <input type="submit" name="action" value="Submit">
            <input type="submit" name="action" value="Delete">
            <input type="hidden" name="new" id="newEvent" value="">
            <input type="hidden" name="oldDate" id="oldDate" value="">
            <input type="hidden" name="oldTitle" id="oldTitle" value="">
            <?php
            echo "<input type=\"hidden\" name=\"month\" value=".$numMonth.">\n";
            echo "<input type=\"hidden\" name=\"year\" value=".$pYear.">\n";
            ?>
        </form>
    </div>
</div>

<script src="resizeTable.js"></script>
<script type="text/javascript">
    window.onload = function () {
        getEvents();
    }
</script>

</body>
</html>

