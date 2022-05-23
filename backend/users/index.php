<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
include_once "../classes/MySQL.php";
include_once "../logger/Logger.php";

$request_method = $_SERVER['REQUEST_METHOD'];
$mySQL = new MySQL(true);

if ($request_method === 'GET' && isset($_GET['id'])) {
    $userId = $_GET['id'];
    $sql = "SELECT id, image, mail, name, phone, admin, street, zipcode, city FROM users WHERE id = '$userId'";
    echo $mySQL->Query($sql, true);
} else if ($request_method === 'GET') {
    $sql = "SELECT * FROM users;";
    echo $mySQL->Query($sql, true);
} else if ($request_method === 'PUT' && isset($_GET['id'])) {
    $userId = $_GET['id'];
    $user = json_decode(file_get_contents('php://input'));

    if (empty($user->image)) {
        Logger::info("If");

        $sql = "UPDATE users
                SET name = '$user->name', mail = '$user->mail', phone = '$user->phone', street = '$user->street', zipcode = '$user->zipcode', city = '$user->city'
                WHERE id = '$userId'";
    } else {
        $base64data = explode(",", $user->image);
        $imageData = base64_decode($base64data[1]);
        $source = imagecreatefromstring($imageData);
        Logger::info("Else");

        // if (is_object($source) && $source instanceof \GdImage) {
            // Use the following savePath for localhost
            // $savePath = $_SERVER["DOCUMENT_ROOT"] . "/frontend/src/assets/img/";
            // Use this path for marcusolrik.dk Simply hosted website
            $savePath = "/var/www/marcusolrik.dk/greeneat/backend/images/";
            $fileName = date("Ymd_His_") . $user->name . ".jpg";
            $imageSave = imagejpeg($source, $savePath . $fileName);
            imagedestroy($source);
            $sql = "UPDATE users
                SET name = '$user->name', image = '$fileName', mail = '$user->mail', phone = '$user->phone', street = '$user->street', zipcode = '$user->zipcode', city = '$user->city'
                WHERE id = '$userId'";
        // } 
    }

    $mySQL->Query($sql, false);
    $sql = "SELECT id, image, mail, name, phone, admin, street, zipcode, city FROM users WHERE id = '$userId'";
    echo $mySQL->Query($sql, true);
}