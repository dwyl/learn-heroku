<?php
include "Database.php";
$db = new Database();

if ($_GET["date"]) {
    $date = $_GET["date"];
    $data = $db->getDataByDate($date);
}else{
    $data = array("date information is needed");
}
echo json_encode($data);