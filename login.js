

function login(event) {
    event.preventDefault();
    const userid= document.getElementById('user').value;
    const pass= document.getElementById('pass').value;

    // Fetch the JSON data from the file
  fetch('signupdetails.json?' + Date.now())
    .then(response => response.json())
    .then(data => {
      // Check if the username and password match
      const userData = data.find(userObj => userObj.user === userid && userObj.password === pass);
      if (userData) {
if(userid=='admin'){
  document.querySelector('#login-failed').style.display='none';
  console.log(userData);
  window.location.href = 'evcoorddashboard/admindash.html';
}else if(userData.usertype=='owner'){
  user=userid;
  document.querySelector('#login-failed').style.display='none';
  console.log("Username and password are correct");
  console.log(user);

localStorage.setItem('user', userid);
localStorage.setItem('phno', userData.phone);
window.location.href = 'owner/ownerdash.html';
}
else{
          user=userid;
          document.querySelector('#login-failed').style.display='none';
          console.log("Username and password are correct");
          console.log(user);
  
                
  console.log(user);
  localStorage.setItem('user', userid);
  window.location.href = 'dashboard.html';
        }

      }
      else {
        user=null;
        document.querySelector('#login-failed').style.display='block';
        console.log("Username or password is incorrect");

        // Display an error message to the user or do something else
      }
    })
    .catch(error => console.error(error));

  
  };
  