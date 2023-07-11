var curloc;
let lat,lng;
let set=0;
let watchId;
let marker,circle,zoomed;
const userIcon=L.icon({
    iconUrl:"images/ChargeZone.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:"images/rating-markers/marker-shadow.png",
    shadowSize: [41, 41]
  });
function getCurrentLocation(){
 document.querySelector('.gpsIcon').innerHTML='location_searching';
  watchId=window.navigator.geolocation.watchPosition(sucess,error);
function sucess(pos){
    console.log('inside');
 lat=pos.coords.latitude;
 lng=pos.coords.longitude;
const accuracy=pos.coords.accuracy;
if(curloc){
    map.removeLayer(curloc);
    map.removeLayer(circle);
    console.log('ok');
}
curloc=L.marker([lat,lng],{icon:userIcon});
curloc.addTo(map);

circle=L.circle([lat,lng],{radius:accuracy}).addTo(map);

if(!zoomed){
    zoomed=map.fitBounds(circle.getBounds());
}
map.setView([lat,lng]);
document.querySelector('.gpsIcon').style.color=' black';
document.querySelector('.gpsIcon').innerHTML='my_location';
document.querySelector('.redirect').style.display='block';
}

function error(){
if(error==1)
{
    alert("please allow location access");
}
else{
    alert("cant get location");

}
}
}


function stopTracking() {
  navigator.geolocation.clearWatch(watchId);
  if(curloc){
    getCurrentLocation();
    map.removeLayer(curloc);
    map.removeLayer(circle);
    console.log('ok');
}

}


function stopTracking() {
    navigator.geolocation.clearWatch(watchId);
    if(curloc){
      map.removeLayer(curloc);
      map.removeLayer(circle);
  }

}

const gpsIcon=document.querySelector('.gpsIcon');
document.querySelector('.gps').addEventListener('click',()=>{
    if(gpsIcon.textContent.trim()=='my_location')
    {
        console.log('disabling');
        document.querySelector('.redirect').style.display='none';
        stopTracking();
        document.querySelector('.gpsIcon').style.color='rgb(82, 82, 82)';
        document.querySelector('.gpsIcon').innerHTML='location_searching';
        
    }
    else{
        console.log('enabling');
        getCurrentLocation();
        set=1;
        nearby();
    }
})


const retry = document.getElementById('redirectIcon');

// Add event listener for click event
retry.addEventListener('click', spinOnce);

function spinOnce() {
  // Add the spinning class
  retry.classList.add('redirectIcon-spinning');
  redirect();
  // Remove the spinning class once the animation completes
  setTimeout(() => {
    retry.classList.remove('redirectIcon-spinning');
  }, 1000); // Adjust the timeout value to match the duration of the animation
}

function redirect(){
    if(curloc!=null){
    const zoomLevel = map.getZoom();
    map.flyTo([lat,lng],zoomLevel);
    }
}