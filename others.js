let adminObj;
//fetch the user details to show other things
function others(){
    adminObj=null;
  fetch('signupdetails.json?' + Date.now())
  .then(response => response.json())
  .then(jsonData => {
    // Loop through the array to find the user object with user = "admin"

    jsonData.forEach(userObj => {
      if (userObj.user ==user) {
        adminObj = userObj;
        console.log('working');
      }
    });

// Loop through the favorites array and do something with each favorite ID
adminObj.favorites.forEach(favoriteId => {
  console.log(`Admin's favorite: ${favoriteId}`);
});

})
}
others();


let flag=-1;
//setcolor
const favIcon=document.querySelector('.favIcon');
function setcolor(){
    console.log('machane')
  if(flag==1){
    console.log('keeri');
    favIcon.innerHTML=`<img src="images/fav.png">`;
  }
  else{
    favIcon.innerHTML=`favorite`;
  }
  flag=-1;
}