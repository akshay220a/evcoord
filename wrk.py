import json

# Read the JSON file
with open('location.json', 'r') as file:
    data = json.load(file)

# Remove the "type" attribute from each data set
for item in data:
    item.pop('type', None)

# Convert the modified data back to JSON format
json_data = json.dumps(data, indent=4)

# Save the modified JSON back to the file
with open('location.json', 'w') as file:
    file.write(json_data)
