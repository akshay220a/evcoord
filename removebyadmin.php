<?php
session_start();

$locationName = $_POST['locationName'];

// Read the current data from acp.json
$json_file = file_get_contents('acp.json');
$datas = json_decode($json_file, true);

// Iterate over the array and remove entries with the specified locationName
$filteredDatas = array_filter($datas, function ($location) use ($locationName) {
    return $location['locationName'] !== $locationName;
});

// Write the updated data to acp.json
$json_data = json_encode(array_values($filteredDatas), JSON_PRETTY_PRINT);
file_put_contents('acp.json', $json_data);
?>
