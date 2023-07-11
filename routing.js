const direction=document.querySelector('.showdirection');
direction.addEventListener('click',()=>{
  document.querySelector('.gpsIcon').innerHTML='location_searching';
  console.log('im working');

    if (currentControl != null) {
        map.removeControl(currentControl);
        currentControl = null;
    }

    navigator.geolocation.getCurrentPosition((position) => {

        const pos1 = position.coords.latitude;
        const pos2 = position.coords.longitude;
        if(usermarker!=null){
            usermarker.remove();
            usermarker=null;
        }
        usermarker= L.marker([pos1, pos2],{ draggable: false }).addTo(map);
        usermarker.bindPopup("You").openPopup();
        currentControl = L.Routing.control({
        waypoints: [
            L.latLng(coord1, coord2), // Start point
            L.latLng(pos1, pos2)   // End point
            ],
            routeWhileDragging: true,
            collapseBtn:true,
        }).addTo(map);
    },
    (error) => {
        console.log(`Error getting current location: ${error.message}`);
    });

})

map.on('click',(e)=>{
  if(currentControl!=null){
    map.removeControl(currentControl);
    currentControl = null;
  }
  if(usermarker!=null){
    usermarker.remove();
    usermarker=null;
  }

})