<?php
include "Database.php";
$db = new Database();
$data = $db->getData();

echo json_encode($data);