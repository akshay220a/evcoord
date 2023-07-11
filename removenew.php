<?php
session_start();

$idToRemove = $_COOKIE['idToRemove'];

// Read the current data from location.json
$json_file = file_get_contents('acp.json');
$datas = json_decode($json_file, true);

// Iterate over the array and remove entries with the specified ID
$filteredDatas = array_filter($datas, function ($location) use ($idToRemove) {
    return $location['name'] !== $idToRemove;
});

// Write the updated data to location.json
$json_data = json_encode(array_values($filteredDatas), JSON_PRETTY_PRINT);
file_put_contents('acp.json', $json_data);
?>
