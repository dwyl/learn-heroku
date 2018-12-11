<?php
include "Database.php";
$db = new Database();

if ($db->createTable()) {
    echo "create table success";
} else {
    echo "create table failed " . $db->getError();
};