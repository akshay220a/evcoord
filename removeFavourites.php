<?php
session_start();
$user = $_COOKIE['user'];
$idToRemove = $_COOKIE['idToRemove'];

// Read the contents of the JSON file into a string
$jsonData = file_get_contents('signupdetails.json');

// Parse the JSON string into a PHP array
$users = json_decode($jsonData, true);

// Find the user object based on the user value
$userObj = null;
foreach ($users as &$u) {
  if ($u['user'] === $user) {
    $userObj = &$u;
    break;
  }
}

if ($userObj) {
  // Check if the favorites array contains the ID
  $index = array_search($idToRemove, $userObj['favorites']);
  if ($index !== false) {
    // Remove the ID from the favorites array
    array_splice($userObj['favorites'], $index, 1);

    // Write the updated PHP array back to the JSON file
    $jsonData = json_encode($users,JSON_PRETTY_PRINT);
    file_put_contents('signupdetails.json', $jsonData);
  }
}
?>
