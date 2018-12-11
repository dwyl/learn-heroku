<?php
$result = array(
    "status" => false,
    "message " => "need data to post"
);
if ($_POST) {
    include "Database.php";
    $db = new Database();
    $id = $_POST["id"];
    $result = array(
        "status" => true,
        "message " => "delete data successfully"
    );
    $status = $db->deleteData($id);
    if (!$status) {
        $error = $db->getError();
        $result = array(
            "status" => false,
            "message " => $error
        );
    }
}
echo json_encode($result);