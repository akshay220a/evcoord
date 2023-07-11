<?php
echo 'working';
$id = $_COOKIE['id'];
$report = $_COOKIE['report'];
$user_name=$_COOKIE['user'];
$current_date = date('Y-m-d');
echo $report;
// Read the current data from location.json
$json_file = file_get_contents('location.json');
$datas = json_decode($json_file, true);

// Check if the location exists in location.json
$location_exists = false;
foreach ($datas as &$location) {
    if ($location['id'] == $id) {
        $location_exists = true;
        // If the location already has 'comments' attribute, add the new comment object to it
        if (isset($location['reports'])) {
            $new_report = array('name' => $user_name, 'report' => $report, 'date' => $current_date);
            array_push($location['reports'], $new_report);
        // If the location doesn't have 'comments' attribute, create it and add the new comment object to it
        } else {
            $new_report = array('name' => $user_name, 'report' => $report, 'date' => $current_date);
            $location['reports'] = array($new_report);
        }
        $report_count = $location['report_count'] ?? 0;
        $report_count = $report_count + 1;
        $location['report_count'] = $report_count;
        break;
    }
}

// Write the updated data to location.json
$json_data = json_encode($datas, JSON_PRETTY_PRINT);
file_put_contents('location.json', $json_data);



$json_file = file_get_contents('signupdetails.json');
$datas = json_decode($json_file, true);

// Check if the location exists in location.json
$location_exists = false;
foreach ($datas as &$location) {
    if ($location['user'] == $user_name) {
        $location_exists = true;
        // If the location already has 'comments' attribute, add the new comment object to it
        if (isset($location['reports'])) {
            $new_report = array('pointId' => $id, 'report' => $report, 'date' => $current_date);
            array_push($location['reports'], $new_report);
        // If the location doesn't have 'comments' attribute, create it and add the new comment object to it
        } else {
            $new_report = array('pointId' => $id, 'report' => $report, 'date' => $current_date);
            $location['reports'] = array($new_report);
        }


        if (isset($location['notifications'])) {
            $new_report = array('notification' => "thanks for reporting " . $id, 'date' => $current_date);
            array_push($location['notifications'], $new_report);
        // If the location doesn't have 'comments' attribute, create it and add the new comment object to it
        } else {
            $new_report = array('notification' => "thanks for reporting " . $id, 'date' => $current_date);
            $location['notifications'] = array($new_report);
        }
        

        $report_count = $location['report_count'] ?? 0;
        $report_count = $report_count + 1;
        $location['report_count'] = $report_count;
        break;
    }
}

// Write the updated data to location.json
$json_data = json_encode($datas, JSON_PRETTY_PRINT);
file_put_contents('signupdetails.json', $json_data);

?>
