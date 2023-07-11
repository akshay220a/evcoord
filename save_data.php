<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Specify the path to the JSON file
    $jsonFilePath = 'acp.json';

    // Read existing JSON data from the file
    $jsonData = file_get_contents($jsonFilePath);
    $existingData = json_decode($jsonData, true);

   

    // Add the new data to the existing data array
    $existingData[] = $data;
    $latitude = $data['latitude'];
    $longitude = $data['longitude'];
    
    // Add latitude and longitude to the data
    $acpData['latitude'] = $latitude;
    $acpData['longitude'] = $longitude;
    
    // Convert the combined data to JSON format
    $updatedJsonData = json_encode($existingData, JSON_PRETTY_PRINT);

    // Write the updated JSON data back to the file
    file_put_contents($jsonFilePath, $updatedJsonData);

    // Send a response indicating success
    http_response_code(200);
    echo 'Data saved successfully.';
}
?>
