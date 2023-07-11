// Function to search for location with auto-suggest
function searchLocation() {
    var location = document.getElementById('location-input').value;
  
    // Use Geoapify Geocoding API to get auto-suggest results
    var url = 'https://api.geoapify.com/v1/geocode/autocomplete?text=' + location + '&apiKey=545a579015ce490999cfe14d02e0a4ae';
    
    // Send AJAX request to get auto-suggest results
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var results = JSON.parse(xhr.responseText);
        
        // Check if auto-suggest returned any results
        if (results.features.length > 0) {
          // Clear existing auto-suggest list
          var autoSuggestList = document.getElementById('auto-suggest-list');
          autoSuggestList.innerHTML = '';
          
          // Add each auto-suggest result to the list
          for (var i = 0; i < results.features.length; i++) {
            var item = document.createElement('li');
            item.innerHTML = results.features[i].properties.formatted;
            item.onclick = function() {
              // Set input value to selected auto-suggest result
              document.getElementById('location-input').value = this.innerHTML;
              
              // Center map on selected location and add marker
              var lat = results.features[this.index].properties.lat;
              var lon = results.features[this.index].properties.lon;
              map.setView([lat, lon], 13);
  

              // Clear auto-suggest list
              autoSuggestList.innerHTML = '';
            };
            item.index = i;
            var icon = document.createElement('span');
            var sub=document.createElement('div');
            sub.className='sub';
            icon.innerHTML = 'location_on';
            icon.className = 'material-symbols-outlined';

            sub.appendChild(icon);
            sub.appendChild(item);
            autoSuggestList.appendChild(sub);
          }
        } else {
          // If auto-suggest returned no results, clear the list
          document.getElementById('auto-suggest-list').innerHTML = '';
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
  
  // Function to show auto-suggest list on input change
  function showAutoSuggest() {
    // Get search input element and auto-suggest list element
    var input = document.getElementById('location-input');
    var autoSuggestList = document.getElementById('auto-suggest-list');
    
    // Add event listener to input element to listen for input changes
    input.addEventListener('input', function() {
      // Check if input value is not empty
      if (input.value.trim() !== '') {
        // Call searchLocation() function to get auto-suggest results
        searchLocation();
        
        // Display auto-suggest list element
        autoSuggestList.style.display = 'block';
      } else {
        // If input value is empty, hide auto-suggest list element
        autoSuggestList.style.display = 'none';
      }
    });
    
    // Hide auto-suggest list element on click outside of the input element
    document.addEventListener('click', function(event) {
      if (event.target !== input) {
        autoSuggestList.style.display = 'none';
      }
    });
  }
  
  
  // Call showAutoSuggest() function to initialize auto-suggest feature
  showAutoSuggest();
  