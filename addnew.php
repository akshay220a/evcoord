<?php
$targetId = $_COOKIE['idToRemove']; // Get the ID from the query string or adjust as per your requirement

// Read the contents of acp.json
$acpData = file_get_contents('acp.json');

// Decode the JSON data
$data = json_decode($acpData, true);

    // Read the contents of location.json
    $locationData = file_get_contents('location.json');
    $location = json_decode($locationData, true);
    $lastDataset = end($location);
    $lastDatasetName = $lastDataset['id'];


// Check if the decoding was successful
if ($data !== null) {
    $selectedData = array();

    // Iterate through each item in the data
    foreach ($data as $key => $item) {
        // Check if the locationName matches the target ID
        if ($item['name'] == $targetId) {
            // Add the matching item to the selectedData array
            $item['id'] = $lastDatasetName+1;
            $selectedData[] = $item;

            // Remove the selected item from the original data
            unset($data[$key]);
        }
    }
    


    // Merge the selected data with the existing data in location.json
    $mergedData = array_merge($location, $selectedData);

    // Convert the merged data to JSON format
    $json = json_encode($mergedData, JSON_PRETTY_PRINT);

    // Write the JSON data back to location.json
    file_put_contents('location.json', $json);

    // Convert the remaining data to JSON format
    $remainingJson = json_encode(array_values($data), JSON_PRETTY_PRINT);

    // Write the remaining data back to acp.json
    file_put_contents('acp.json', $remainingJson);

    // Output a success message
    echo "Data copied and deleted successfully!";
} else {
    echo "Error: Unable to decode acp.json.";
}
?>
