

const favlist = document.querySelector('.fav-list');
let value,removeid;

//add to favorite
function addfavourite() {
if(user!=null){
  
    console.log('haii'+curr);
  document.cookie = "value=" + encodeURIComponent(curr);
  document.cookie = "user=" + encodeURIComponent(user);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Do something with the response
    }
  };
  xhttp.open("POST", "process.php", true);
  xhttp.send();
  document.querySelector('.fav-list').innerHTML='';
  setTimeout(() => {
  fav();
  //others();
}, 1000);
}
else{
  popupContainer.style.display = 'block';
  console.log('report');
  document.querySelector('.login-popup').style.display="block";
}

}

//remove rom favorite
function removefav(idToRemove) {
  console.log('haii');
  document.cookie = "idToRemove=" + encodeURIComponent(idToRemove);
  document.cookie = "user=" + encodeURIComponent(user);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Do something with the response
    }
  };
  xhttp.open("POST", "removeFavourites.php", true);
  xhttp.send();
  document.querySelector('.fav-list').innerHTML='';
  setTimeout(() => {
  fav();
}, 500);

}

let loggedInUserId;

//show favorites
function fav(){
    console.log('running function fav');
     document.querySelector('.fav-list').innerHTML='';
    fetch('signupdetails.json?' + Date.now())
    .then(response => response.json())
    .then(data => {
      // Assume that the user with ID "admin" is currently logged in
      // Find the user object that matches the logged in user ID
      loggedInUserId=user;
      console.log(user);
      const loggedInUser = data.find(user => user.user === loggedInUserId);
  
      // If the user is not found, do not display any chargepoint details
      if (!loggedInUser) {
        return;
      }
  
      // Load the chargepoint.json file and parse its contents
      fetch('location.json')
    .then(response => response.json())
    .then(chargepoints => {
      // Filter the chargepoints that match the user's favorite IDs
      const favoriteChargepoints = loggedInUser.favorites ? chargepoints.filter(chargepoint => loggedInUser.favorites.includes(chargepoint.id)) : [];
  
      // Display the chargepoint details as divs
      favoriteChargepoints.forEach(chargepoint => {
        const div = document.createElement('div');
        div.classList.add('chargepoint-container');
        div.innerHTML = `<div class="fav-head"><div style="display:flex">
        <span class="material-symbols-outlined">
        ev_charger
     </span>
                  <h2 onclick="go('${chargepoint.id}')">${chargepoint.name}</h2></div>
                  <div class="favbtn">
                  <button  onclick="removefav('${chargepoint.id}')"><span class="material-symbols-outlined delete-icon">
                      delete
                      </span></button>
                    </div>
              </div>
                  <p>${chargepoint.address}</p>`;
  
        // Add the div to the updown1 element if it exists
  
        if (favlist) {
            favlist.appendChild(div);
        }
      });
    });
  
      });
  }
  