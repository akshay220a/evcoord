<!DOCTYPE html>
<html>
<head>
    <title>Display Data from JSON</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 20px;
        }
        
        #dataContainer {
            background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .dataEntry {
            margin-bottom: 10px;
            padding: 10px;
            background-color: #e6e6e6;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .dataEntry h2 {
            margin: 0;
        }
        
        .deleteButton {
            color: #fff;
            background-color: #ff4d4d;
            border: none;
            border-radius: 3px;
            padding: 5px 10px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="dataContainer"></div>
    
    <script>
        fetch('acp.json')
          .then(response => response.json())
          .then(data => {
            const dataContainer = document.getElementById('dataContainer');
            
            data.forEach(item => {
              const div = document.createElement('div');
              div.className = 'dataEntry';
              div.innerHTML = `
                <div>
                  <h2>${item.locationName}</h2>
                  <h2>${item.address}</h2>
                  <h2>${item.City}</h2>
                  <h2>${item.chargeType}</h2>
                  <h2>${item.ownerName}</h2>
                  <h2>${item.ownerPhone}</h2>
                </div>
                <button class="approvalButton">Approval</button>
                <button onclick="removeByReport('${item.locationName}')" class="deleteButton">Delete</button>
              `;
              dataContainer.appendChild(div);
            });
            
            // Add event listeners for approval and delete buttons
            const approvalButtons = document.querySelectorAll('.approvalButton');
            const deleteButtons = document.querySelectorAll('.deleteButton');
            
            approvalButtons.forEach(button => {
              button.addEventListener('click', () => {
                // Add approval functionality here
                console.log('Approval button clicked');
              });
            });

            deleteButtons.forEach(button => {
              button.addEventListener('click', () => {
                // Delete the corresponding div element
                const dataEntry = button.parentNode;
                dataContainer.removeChild(dataEntry);

                // Send request to remove the item from acp.json
                const locationName = dataEntry.querySelector('h2:first-child').textContent;
                removeByReport(locationName);
              });
            });

            function removeByReport(locationName) {
              const xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  // Do something with the response
                }
              };
              xhttp.open("POST", "removebyadmin.php", true);
              xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              xhttp.send(`locationName=${encodeURIComponent(locationName)}`);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
    </script>
</body>
</html>
