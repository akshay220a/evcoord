<?php

echo "Username already exists";
$user = $_COOKIE['user'];
$id = $_COOKIE['value'];

// Read the current favorites for the user from signup.json
$json_file = file_get_contents('signupdetails.json');
$datas = json_decode($json_file, true);

// Check if the user exists in signup.json
$user_exists = false;
foreach ($datas as &$item) {
    if ($item['user'] == $user) {
        $user_exists = true;
        // If the user already has 'favorites' attribute, add the id to it
        if (isset($item['favorites'])) {
            if (!in_array($id, $item['favorites'])) {
                $item['favorites'][] = $id;
            }
        // If the user doesn't have 'favorites' attribute, create it and add the id
        } else {
            $item['favorites'] = array($id);
        }
        break;
    }
}

// Write the updated data to signup.json
$json_data = json_encode($datas,JSON_PRETTY_PRINT);
file_put_contents('signupdetails.json', $json_data);

?>