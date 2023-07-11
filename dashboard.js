

let a=0;
function showsidebar(){
    if(start==1){
      if(document.querySelector('.right-reportbar').style.display=='block'){
        document.querySelector('.right-reportbar').style.display="none";
        j++;
    }
      if(a%2==0){
        document.querySelector('.show-sidebar-icon').src="images/commentdisable.png";
        document.querySelector('.right-commentbar').style.display="none";
    }
    else{
        document.querySelector('.show-sidebar-icon').src="images/comment.png";
        document.querySelector('.right-commentbar').style.display="block";
    }
    a++;
    }
}

//left side collapse btn

function collapse() {
    var icon = document.querySelector('.collapseicon');
    var icontype = icon.textContent;
    if (icontype.trim() === 'close') {
      document.querySelector('.filterbar').style.display = 'none';
      icon.innerHTML = "menu";
    }
    else{
      document.querySelector('.filterbar').style.display = 'block';
      icon.innerHTML = "close";

    }
  }
  

  //left searchbar erase btn

  function erase(){
    document.getElementById('location-input').value=null;
  }