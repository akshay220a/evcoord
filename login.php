<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the form data

  $user = $_COOKIE['user'];
  $pass = $_COOKIE['pass'];

  $json_file = file_get_contents('signupdetails.json');

  // Decode the JSON data into an associative array
  $datas = json_decode($json_file, true);
  $flag=0;
  
  // Loop through the array to check if the username already exists
  foreach ($datas as $item) {
      if (($item['user'] == $user) && ($item['password'] == $pass)) {
          $flag=1;

      }
  }

  
  if ($flag == 1) {
    echo 'login Sucessfull';
}
else{
    echo 'login Failed';
}
}
?>


