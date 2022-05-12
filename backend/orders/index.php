<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
include_once("../classes/MySQL.php");

$request_method = $_SERVER['REQUEST_METHOD'];
$mySQL = new MySQL(true);

if ($request_method === 'GET' && isset($_GET['buyerId'])) {
    $buyerId = $_GET['buyerId'];
    $sql = "SELECT * FROM orders WHERE buyerId = '$buyerId'";
    echo $mySQL->Query($sql, true);
} else if ($request_method === 'GET') {
    $sql = "SELECT * FROM orders";
    echo $mySQL->Query($sql, true);
} else if ($request_method === 'POST') {
    $newOrder = json_decode(file_get_contents('php://input'));

    $sql = "INSERT INTO orders
                    (buyerId, sellerId, postid, amount)
                VALUES
                    ('$newOrder->buyerId', '$newOrder->sellerId', '$newOrder->postid', $newOrder->amount)
                ";
    echo $mySQL->Query($sql, false);
} else if ($request_method === 'DELETE' && isset($_GET['postid'])) {
    $postId = $_GET['postid'];
    $sql = "DELETE FROM favorites WHERE postid = '$postId'";
    echo $mySQL->Query($sql, false);
}
