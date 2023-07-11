
// Function to filter the markers based on the selected checkboxes
function filterMarkers() {
 
  markerClusterGroupByFilter.clearLayers();
  markersLocator.forEach(marker => marker.remove());
  markersLocator=[];
  // Get the selected checkboxes
  const checkboxes = document.getElementsByName('charging-point');
  const selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);

  // Hide all markers
  markers.forEach(marker => markerClusterGroup.removeLayer(marker));

  // Show the markers for the selected locations
  selectedCheckboxes.forEach(checkbox => {
    const value = checkbox.value.toLowerCase();
    markers.forEach(marker => {
      const name = marker.getPopup().getContent().toLowerCase().includes(value);
      const address = marker.getPopup().getContent().toLowerCase().includes(value);
      if (name || address) {
        markerClusterGroup.addLayer(marker);
      }
    });
  });
}

function selectAll() {
 
  markerClusterGroupByFilter.clearLayers();
  markersLocator.forEach(marker => marker.remove());
  markersLocator=[];
  const checkboxes = document.getElementsByName('charging-point');
  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox.checked) {
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
    
    filterMarkers();
  } else {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    markers.forEach(marker => markerClusterGroup.removeLayer(marker));
  }
}

