
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeDiv = document.querySelector('.dark-mode');
let darkcount=0;
darkModeToggle.addEventListener('change', () => {
  if(darkcount%2==0){
    document.querySelector('.dashboard-header1').style.backgroundColor='grey';
    document.querySelector('.dashboard-header1').style.color='whitesmoke';
    map.removeLayer(googleSat);
    // Show the dark tile layer
    darkTileLayer.addTo(map);
  }
  else{
    document.querySelector('.dashboard-header1').style.backgroundColor='white';
    document.querySelector('.dashboard-header1').style.color='black';
    map.removeLayer(darkTileLayer);
    layerdef();
  }
  darkcount++;
})
