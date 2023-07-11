const markersLayer = L.layerGroup();
const markersLayer2 = L.layerGroup();
const markers = [];
let curr,start=0; 
let coord1, coord2;
let currentControl = null;
let usermarker;
let isDataFetched = false;
const markerClusterGroup = L.markerClusterGroup({maxClusterRadius: 268,
  spiderfyOnMaxZoom: false,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom:11});

const defaultMarker=L.icon({
  iconUrl:"images/icons/volttic.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:"images/rating-markers/marker-shadow.png",
  shadowSize: [41, 41]
});

fetch('location.json?' + Date.now())
  .then(response => response.json())
  .then(chargepoints => {
    chargepoints.forEach(chargepoint => {
        marker = L.marker([chargepoint.lattitude, chargepoint.longitude],{icon:defaultMarker}); 
      marker.bindPopup(`<b>${chargepoint.name}</b><p>${chargepoint.address}</p>`,{ closeButton: false }); // Add popup with chargepoint name
      markersLayer.addLayer(marker);
      markersLayer2.addLayer(marker);

            // Add the marker to the marker cluster group
      markerClusterGroup.addLayer(marker);

            // Add the marker to the array of markers
      markers.push(marker);
      marker.on('click', function (e) {
        start=1;
        if(currentControl!=null){
              map.removeControl(currentControl);
              currentControl = null;
        }
        if(usermarker!=null){
          usermarker.remove();
          usermarker=null;
        }
        
       curr=chargepoint.id;
        console.log(curr);
        if(isDataFetched==false){
          document.querySelector('.show-sidebar-icon').style.display="block";
            isDataFetched = true;
            document.querySelector('.right-reportbar').style.display='none';
            j++;
            document.querySelector('.right-commentbar').style.display = "block";
        }

        
        showcmt();
 
      coord1=e.latlng.lat;
      coord2=e.latlng.lng;

      });

      map.addLayer(markerClusterGroup);
    });


  });




  //function for navigate btn
function go(govalue){

  fetch('location.json')
  .then(response => response.json())
  .then(chargepoints => {
    //markersLayer.eachLayer(marker => marker.addTo(map));
        const chargepoint = chargepoints.find(c => c.id == govalue);
        if(chargepoint) {
          map.flyTo([chargepoint.lattitude, chargepoint.longitude], 18);          
        } else {
          console.log(`Chargepoint with id ${govalue} not found`);
        }
  });
}


/*
  setTimeout(() => {
    markersLayer.eachLayer(marker => marker.addTo(map));
  }, 2000);
  
*/

function scroll(){
  console.log('ooh');
  const scrollableDiv = document.querySelector('.commentbar-main');

// Set the desired scroll height
const desiredScrollHeight = 280; // Replace with your desired scroll height

// Scroll the <div> to the desired scroll height
scrollableDiv.scrollTop = desiredScrollHeight;
}

const rateicon=document.querySelector('.rate');
rateicon.addEventListener('click',()=>{
  scroll();
})