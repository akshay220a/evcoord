const reporticon=document.querySelector('.report-icon');
const popupContainer = document.getElementById('popupContainer');
reporticon.addEventListener('click',()=>{
  if(user!=null){
    document.querySelector('.login-popup').style.display="none";
    popupContainer.style.display = 'block';
    console.log('report');
    document.querySelector('.report-popup').style.display="block";
  }
  else{
      popupContainer.style.display = 'block';
      console.log('report');
      document.querySelector('.login-popup').style.display="block";
  }

})


function cancelreport(){
    console.log('cancel');
    document.querySelector('.report-popup').style.display="none";
    popupContainer.style.display = 'none';
}

let reportContent;
function report(index){
    if(user!=null){
      const listItems = document.querySelectorAll('.report-list li');
  
      if (index >= 0 && index <= listItems.length) {
        const listItem = listItems[index];
        const text = listItem.textContent;
        reportContent=text;
        console.log(reportContent);
      }  
      submitreport();
      cancelreport();
    }
}
const dispnotification = document.querySelector('.notification-main');

function shownotification() {

  console.log('ok show noti');
  document.querySelector('.notification-main').innerHTML = '';

  fetch('signupdetails.json?' + Date.now())
    .then(response => response.json())
    .then(data => {
      data.forEach(chargepoint => {
        console.log('data.user:', chargepoint.user);

        if (chargepoint.user == user) {
          console.log('oin k show noti');
                  if(chargepoint.notifications!=null){
                    chargepoint.notifications.forEach(datas => {
                      console.log('inside ok show noti');
                      const notification = document.createElement('div');
                      notification.className = 'notification-x';
                      notification.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;"><p>${datas.date}</p><span class="material-symbols-outlined" onclick="removenotiication('${datas.notification}')">
                      delete
                  </span></div><b>${datas.notification}</b>`;
                      dispnotification.appendChild(notification);
                    });
                  }
        }
      });
    });
}





function removenotiication(item){
  console.log(item);
  document.cookie = "user=" + encodeURIComponent(user);
  document.cookie = "id=" + encodeURIComponent(item);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log('inside')
    if (this.readyState == 4 && this.status == 200) {
      // Do something with the response
    }
  };
  xhttp.open("POST", "removenotification.php", true);
  xhttp.send();
setTimeout(()=>{
  shownotification();
},200)
  }
  













document.addEventListener('click', function(event) {
  if (event.target === popupContainer) {
    cancelreport();
  }
});

function submitreport(){
    if(user!=null){
        console.log('working cmt');
        document.cookie = "report=" + encodeURIComponent(reportContent);
        document.cookie = "user=" + encodeURIComponent(user);
      document.cookie = "id=" + encodeURIComponent(curr);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // Do something with the response
        }
      };
      xhttp.open("POST", "report.php", true);
      xhttp.send();
setTimeout(()=>{
  shownotification();
},1000)

    }
}