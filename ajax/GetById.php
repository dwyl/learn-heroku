<?php
include "Database.php";
$db = new Database();

if ($_GET["id"]) {
    $id = $_GET["id"];
    $data = $db->getDataById($id);
}else{
    $data = array("id information is needed");
}
echo json_encode($data);