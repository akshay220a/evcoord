let pos1,pos2;
let currentMarker;


function nearby(){
  navigator.geolocation.getCurrentPosition((position) => {

    pos1 = position.coords.latitude;
    pos2 = position.coords.longitude;
    currentMarker = {
       lat: pos1,
       lng: pos2
     };

     console.log(currentMarker);
     document.querySelector('.gpsIcon').innerHTML='location_searching';
     findnearest();
     document.querySelector('.nearby-list').innerHTML='';
     document.querySelector('.nearby-list-header').innerHTML="LOAD MORE";
     if(set!=1){
      document.querySelector('.nearby-list-header').style.display="block";
     }
})
}






function findnearest(){ 
const url = 'location.json?' + Date.now();

// Create an empty array to store the markers
const markers = [];

// Define the current marker




// Define a function to calculate the distance between two markers
function calculateDistance(marker1, marker2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (marker2.lat - marker1.lat) * Math.PI / 180; // Convert degrees to radians
  const dLon = (marker2.lng - marker1.lng) * Math.PI / 180; // Convert degrees to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(marker1.lat * Math.PI / 180) * Math.cos(marker2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

// Define a function to find the nearest marker to the current marker
function findNearestMarkers(currentMarker, markers, numMarkers) {
  let nearestMarkers = [];
  let nearestDistances = Array(numMarkers).fill(Number.MAX_VALUE);
  markers.forEach(marker => {
    const distance = calculateDistance(currentMarker, marker);
    let indexToReplace = -1;
    for (let i = 0; i < nearestDistances.length; i++) {
      if (distance < nearestDistances[i]) {
        indexToReplace = i;
        break;
      }
    }
    if (indexToReplace >= 0) {
      nearestMarkers.splice(indexToReplace, 0, marker);
      nearestDistances.splice(indexToReplace, 0, distance);
      nearestMarkers = nearestMarkers.slice(0, numMarkers);
      nearestDistances = nearestDistances.slice(0, numMarkers);
    }
  });
  return nearestMarkers;
}


// Fetch the location data
fetch('location.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(location => {
      // Create a new marker for the location
      const marker = {
        lat: parseFloat(location.lattitude),
        lng: parseFloat(location.longitude)
      };

      // Bind a tooltip to the marker with the location name and address, and set the 'sticky' option to true
      const tooltipContent = `<b>${location.name}</b><br>${location.address}`;
      const tooltipOptions = { sticky: true };
      L.marker([marker.lat, marker.lng])
        .bindTooltip(tooltipContent, tooltipOptions);
      // Add the marker to the array of markers
      markers.push(marker);
    });

    // Call the findNearestMarkers function to find the nearest markers to the current marker
    const nearestMarkers = findNearestMarkers(currentMarker, markers,num);

    // Display the nearest markers on the map
    nearestMarkers.forEach(marker => {
      // Find the location data for the current marker
      const locationData = data.find(location => {
        return (
          parseFloat(location.lattitude) === marker.lat &&
          parseFloat(location.longitude) === marker.lng
        );
      });



      const div = document.createElement('div');
      div.classList.add('chargepoint-container');
      div.innerHTML = `<div onclick="go('${locationData.id}')" class="nearby-head">
                          <div style="display:flex;">
                            <span class="material-symbols-outlined">
                              ev_charger
                            </span>
                            <h2>${locationData.name}</h2>
                            </div>
                            <p>${locationData.address}</p>
                        </div>`;
        document.querySelector('.nearby-list').appendChild(div);

        
    });
  })
  .catch(error => {
    console.error('Error fetching location data:', error);
  });
}

let num=3;
function loadMore(){
  document.querySelector('.nearby-list').innerHTML='';
  num=num+3;
  findnearest();
}
