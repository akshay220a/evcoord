var markersLocator = [];
fetch('location.json')
    .then(response => response.json())
    .then(data => {
        let stateSet = new Set();
        let cityMap = new Map();
        data.forEach(location => {
            let state = location.state.trim().toUpperCase();
            if (stateSet.has(state)) {
                cityMap.get(state).push(location);
            } else {
                stateSet.add(state);
                cityMap.set(state, [location]);
            }
        });
        stateSet.forEach(state => {
            let stateOption = document.createElement('option');
            stateOption.value = state;
            stateOption.text = state;
            document.getElementById('stateSelect').appendChild(stateOption);
        });

        document.getElementById('stateSelect').addEventListener('change', event => {
            const selectedState = event.target.value;
            const citySelect = document.getElementById('citySelect');
            citySelect.innerHTML = '';

            if (selectedState === 'Select a State') {
                let cityOption = document.createElement('option');
                cityOption.disabled = true;
                cityOption.selected = true;
                cityOption.text = 'Select a City';
                citySelect.appendChild(cityOption);
            } else {
                let cities = cityMap.get(selectedState);
                let uniqueCities = [...new Set(cities.map(city => city.city))];
                uniqueCities.forEach(city => {
                    let cityOption = document.createElement('option');
                    cityOption.value = city;
                    cityOption.text = city;
                    citySelect.appendChild(cityOption);
                });
            }
        });

        document.getElementById('submitButton').addEventListener('click', () => {
            markerClusterGroupByFilter.clearLayers();
   // markersLayer.clearLayers();
   markers.forEach(marker => markerClusterGroup.removeLayer(marker));

const selectedCity = document.getElementById('citySelect').value;
const selectedState = document.getElementById('stateSelect').value;
const cities = cityMap.get(selectedState);

if(markersLocator!=null)
markersLocator.forEach(marker => marker.remove());


const selectedCityLocations = cities.filter(location => location.city === selectedCity);
if (selectedCityLocations.length > 0) {
const selectedCityCoordinates = selectedCityLocations.map(location => [location.lattitude, location.longitude]);
map.fitBounds(selectedCityCoordinates);

selectedCityCoordinates.forEach(coordinates => {
    const marker = L.marker(coordinates).addTo(map);
    const chargepoint = selectedCityLocations.find(location => location.lattitude === coordinates[0] && location.longitude === coordinates[1]);
    if (chargepoint) {
        marker.bindPopup(chargepoint.name,{closeButton:false});
        marker.on('click',()=>{
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
                  isDataFetched = true;
                  document.querySelector('.right-commentbar').style.display = "block";
              }
              document.querySelector('.commentbar-header').innerHTML=chargepoint.name;
              document.querySelector('.point-address').innerHTML=chargepoint.address;
              document.querySelector('.point-city').innerHTML=chargepoint.city;
              document.querySelector('.point-number').innerHTML=chargepoint.ownerPhone;
              console.log(chargepoint.ownerPhone);
              document.querySelector('.point-rating').innerHTML=chargepoint.rating;
              document.querySelector('.point-response').innerHTML=chargepoint.responses;
              document.querySelector('.cmts').innerHTML='';
              if(chargepoint.comments!=null){
              chargepoint.comments.forEach(comment => {
                  const commentElement = document.createElement('div');
                  
                  commentElement.innerHTML =`
                  <div class="ncmt">
                  <div class="subcmt">
                      <span class="material-symbols-outlined acc">
                  account_circle
                  </span>
                      <div class="cmteduser">
                          <div class="ratetime">
                            <h3>${comment.name}</h3>
                              <div class="subrate">
                                <span class="material-symbols-outlined">
                                   star
                                </span>
                                <h5>${comment.rating}</h5>
                              </div>
                          </div>
                          <h5>${comment.date}</h5>
                      </div>
                  </div> 
                  <div class="cmt">
                      <p>${comment.comment}</p>
                  </div>
                  </div>`;
                  document.querySelector('.cmts').appendChild(commentElement);
              })
            }
            else{
              document.querySelector('.cmts').innerHTML=`<div class="cmt-heading"><span class="material-symbols-outlined">
              info
              </span><h2>&nbsp; No Comments And Reviews</h2></div>`;
            }
     })
      

    }
    markersLocator.push(marker);

});

}
});

    })
    .catch(() => console.error);


    const refresh=document.querySelector('.refresh');
    refresh.addEventListener('click', () => {
      map.removeLayer(markerClusterGroupByFilter);
      markersLocator.forEach(marker => marker.remove());
      markersLocator=[];
      markersLayer2.eachLayer(marker => {
        // markersLayer.addLayer(marker);
         // Add each marker from markerLayer2 to markerLayer
         markerClusterGroup.addLayer(marker);
      });
      
      // Add markerLayer to the map
      //markersLayer.addTo(map);
      map.addLayer(markerClusterGroup);
    });
    
    