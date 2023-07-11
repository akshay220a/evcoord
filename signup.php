<?php
  // Get the form data
  $user = $_COOKIE['user'];
  $phno = $_COOKIE['phone'];
  $pass = $_COOKIE['pass'];
  $userType = $_COOKIE['userType'];

  $data = file_exists('signupdetails.json') && filesize('signupdetails.json') > 0 ? json_decode(file_get_contents('signupdetails.json'), true) : [];

  // Create an array with the form data
  $newData = array(
    'user' => $user,
    'phone' => $phno,
    'password'=>$pass,
    'usertype'=>$userType
  );

  $json_file = file_get_contents('signupdetails.json');

// Decode the JSON data into an associative array
$datas = json_decode($json_file, true);

  array_push($data, $newData);

  $json = json_encode($data, JSON_PRETTY_PRINT);

  $result = file_put_contents('signupdetails.json', $json);

  if ($result === false) {
    echo 'Error writing to file: ' . error_get_last()['message'];
  } else {
    echo '<p>Data added successfully!</p>';
  }

  exit();

?>
