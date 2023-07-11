<?php
session_start();

$id = $_COOKIE['id'];
$cmt = $_COOKIE['cmt'];
$user_name=$_COOKIE['user'];
$current_date = date('Y-m-d');
$ratingValue=$_COOKIE['ratingValue'];

// Read the current data from location.json
$json_file = file_get_contents('location.json');
$datas = json_decode($json_file, true);

// Check if the location exists in location.json
$location_exists = false;
foreach ($datas as &$location) {
    if ($location['id'] == $id) {
        $location_exists = true;
        // If the location already has 'comments' attribute, add the new comment object to it
        if (isset($location['comments'])) {
            $new_comment = array('name' => $user_name, 'comment' => $cmt, 'date' => $current_date, 'rating' => $ratingValue);
            array_push($location['comments'], $new_comment);
        // If the location doesn't have 'comments' attribute, create it and add the new comment object to it
        } else {
            $new_comment = array('name' => $user_name, 'comment' => $cmt, 'date' => $current_date, 'rating' => $ratingValue);
            $location['comments'] = array($new_comment);
        }
        // Update the 'responses' count and calculate the 'rating' attribute value
        $current_rating = $location['rating'] ?? 0;
        $current_responses = $location['responses'] ?? 0;
        $new_responses = $current_responses + 1;
        $new_rating = ($current_rating * $current_responses + $ratingValue) / $new_responses;
        $new_rating = number_format($new_rating, 2);
        $location['responses'] = $new_responses;
        $location['rating'] = $new_rating;
        break;
    }
    
}

// Write the updated data to location.json
$json_data = json_encode($datas, JSON_PRETTY_PRINT);
file_put_contents('location.json', $json_data);
?>
