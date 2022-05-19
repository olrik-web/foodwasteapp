<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
include_once "../classes/MySQL.php";

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

    $sql = "SELECT quantity FROM posts WHERE id= '$newOrder->postid'";
    $JsonObj = json_decode($mySQL->Query($sql, true), true);
    $result = printValues($JsonObj);

    $postQuantity = $result["values"][2];

    $value = $postQuantity - $newOrder->amount;

    if ($value >= 0) {

        $sql1 = "INSERT INTO orders
                    (buyerId, sellerId, postid, amount)
                VALUES
                    ('$newOrder->buyerId', '$newOrder->sellerId', '$newOrder->postid', $newOrder->amount)
                ";

        $sql2 = "UPDATE posts SET quantity = '$value' WHERE id = '$newOrder->postid'";
        echo $mySQL->Query($sql1, false);
        echo $mySQL->Query($sql2, false);
    }
} else if ($request_method === 'DELETE' && isset($_GET['postid'])) {
    $postId = $_GET['postid'];
    $sql = "DELETE FROM favorites WHERE postid = '$postId'";
    echo $mySQL->Query($sql, false);
}

// Define recursive function to extract nested values
function printValues($arr)
{
    global $count;
    global $values;

    // Check input is an array
    if (!is_array($arr)) {
        die("ERROR: Input is not an array");
    }

    /*
    Loop through array, if value is itself an array recursively call the
    function else add the value found to the output items array,
    and increment counter by 1 for each value found
     */
    foreach ($arr as $key => $value) {
        if (is_array($value)) {
            printValues($value);
        } else {
            $values[] = $value;
            $count++;
        }
    }

    // Return total count and values found in array
    return array('total' => $count, 'values' => $values);
}
