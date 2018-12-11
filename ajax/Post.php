<?php
$result = array(
    "status" => false,
    "message " => "need data to post"
);
if ($_POST) {
    include "Database.php";
    $db = new Database();
    $data = array(
        "date" => $_POST["date"],
        "start_time" => $_POST["start_time"],
        "end_time" => $_POST["end_time"],
        "event_name" => $_POST["event_name"],
        "email" => $_POST["email"],
    );

    if (isset($_POST["id"])){
        $data["id"] = $_POST["id"];
    }

    $result = array(
        "status" => true,
        "message " => "submit data successfully"
    );
    $status = $db->submitData($data);
    if (!$status) {
        $error = $db->getError();
        $result = array(
            "status" => false,
            "message " => $error
        );
    }
}
echo json_encode($result);

