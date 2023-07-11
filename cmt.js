
let ratingValue;
const ratingSpans = document.querySelectorAll('.rating');
ratingSpans.forEach(span => {
  span.addEventListener('click', () => {
    ratingValue = span.getAttribute('data-value');
    console.log(ratingValue);
  });
});

const ratings = document.querySelectorAll('.rating');
let selectedRating = 0;

function handleRating(e) {
    const ratingValue = parseInt(e.target.getAttribute('data-value'));
    if (selectedRating === ratingValue) {
      selectedRating = 0;
    } else {
      selectedRating = ratingValue;
    }
  
    for (let i = 0; i < ratings.length; i++) {
      if (i < selectedRating) {
        ratings[i].classList.add('selected');
      } else {
        ratings[i].classList.remove('selected');
      }
    }
  }
  
  for (let i = 0; i < ratings.length; i++) {
    ratings[i].addEventListener('click', handleRating);
  }

  function SubmitCmt(){
    console.log('working cmt');
    const cmt=document.querySelector('.cmt').value;
    console.log('working cmt');
    if(user!=null){
      console.log('working cmt');
      document.cookie = "cmt=" + encodeURIComponent(cmt);
      document.cookie = "user=" + encodeURIComponent(user);
    document.cookie = "id=" + encodeURIComponent(curr);
    document.cookie = "ratingValue=" + encodeURIComponent(ratingValue);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Do something with the response
      }
    };
    xhttp.open("POST", "comment.php", true);
    xhttp.send();
    setTimeout(() => {
      document.querySelector('.cmt').value='';
      for (let i = 0; i < ratings.length; i++) {
          ratings[i].classList.remove('selected');
        }
      showcmt();
      console.log('recalled');
  }, 1000);
  
    }
}


function showcmt(){
    fetch('location.json?' + Date.now())
    .then(response => response.json())
    .then(data => {
      data.forEach(chargepoint => {
        if(chargepoint.id==curr){
          document.querySelector('.commentbar-header').innerHTML=chargepoint.name;
          document.querySelector('.point-address').innerHTML=chargepoint.address;
          document.querySelector('.point-city').innerHTML=chargepoint.city;
          document.querySelector('.point-number').innerHTML=chargepoint.ownerPhone;
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

        }
    })
  })
  
}
