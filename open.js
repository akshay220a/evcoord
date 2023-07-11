
let icontype;
document.querySelector('.fav-list').style.display='none';
document.querySelector('.filterlist').style.display='none';
document.querySelector('.nearby-list').style.display="none";
document.querySelector('.nearby-list-header').style.display="none";
document.querySelector('.charginglocator').style.display='none';
document.getElementById('notlogin').style.display='none';
function open2(){
    icontype=document.querySelector('.e2').textContent;
    if (icontype.trim()=='expand_more') {
        if(user==null){
            document.getElementById('notlogin').style.display='none';
        }
        document.querySelector('.e1').innerHTML='expand_more';
        document.querySelector('.e3').innerHTML='expand_more';
        document.querySelector('.e4').innerHTML='expand_more';
        document.querySelector('.e2').innerHTML='expand_less';
        document.querySelector('.filterlist').style.display='none';
        document.querySelector('.charginglocator').style.display='none';
        document.querySelector('.fav-list').style.display='none';
        const content=document.querySelector('.nearby-list-header').textContent;
        if(content!=''){
            document.querySelector('.nearby-list-header').style.display="block";
        }
        document.querySelector('.nearby-list').style.display='block';
    }
    else{
        document.querySelector('.e1').innerHTML='expand_more';
        document.querySelector('.e2').innerHTML='expand_more';
        document.querySelector('.nearby-list-header').style.display="none";
        document.querySelector('.nearby-list').style.display='none';
 
    }
}
function open4(){
    icontype=document.querySelector('.e4').textContent;
    if (icontype.trim()=='expand_more') {
        if(user==null){
            document.getElementById('notlogin').style.display='none';
        }
        document.querySelector('.e1').innerHTML='expand_more';
        document.querySelector('.e2').innerHTML='expand_more';
        document.querySelector('.e3').innerHTML='expand_more';
        document.querySelector('.e4').innerHTML='expand_less';
        document.querySelector('.filterlist').style.display='none';
        document.querySelector('.fav-list').style.display='none';
        document.querySelector('.nearby-list-header').style.display="none";
        document.querySelector('.nearby-list').style.display='none';
        document.querySelector('.charginglocator').style.display='block';
    }
    else{
        document.querySelector('.e1').innerHTML='expand_more';
        document.querySelector('.e2').innerHTML='expand_more';
        document.querySelector('.e4').innerHTML='expand_more';
        document.querySelector('.charginglocator').style.display='none';
 
    }

}
//filterlist
function open1(){
    icontype=document.querySelector('.e1').textContent;
    if (icontype.trim()=='expand_more') {
        document.querySelector('.e3').innerHTML='expand_more';
        document.querySelector('.e4').innerHTML='expand_more';
        document.querySelector('.e2').innerHTML='expand_more';
        document.querySelector('.e1').innerHTML='expand_less';
        document.querySelector('.nearby-list-header').style.display="none";
        document.querySelector('.nearby-list').style.display='none';
        document.querySelector('.fav-list').style.display='none';
        document.querySelector('.charginglocator').style.display='none';
        document.querySelector('.filterlist').style.display='block';
    }
    else{
        document.querySelector('.e1').innerHTML='expand_more';
        document.querySelector('.e2').innerHTML='expand_more';
        document.querySelector('.e4').innerHTML='expand_more';
        document.querySelector('.filterlist').style.display='none';
 
    }

}

function open3(){
    icontype=document.querySelector('.e3').textContent;
    if (icontype.trim()=='expand_more') {
        if(user==null){
            document.getElementById('notlogin').style.display='none';
        }
        document.querySelector('.e1').innerHTML='expand_more';
        document.querySelector('.e4').innerHTML='expand_more';
        document.querySelector('.e2').innerHTML='expand_more';
        document.querySelector('.e3').innerHTML='expand_less';
        if(user==null){
            document.getElementById('notlogin').style.display='block';
        }
        document.querySelector('.nearby-list-header').style.display="none";
        document.querySelector('.nearby-list').style.display='none';
        document.querySelector('.charginglocator').style.display='none';
        document.querySelector('.filterlist').style.display='none';
        document.querySelector('.fav-list').style.display='block';
    }
    else{
        if(user==null){
            document.getElementById('notlogin').style.display='none';
        }
        document.querySelector('.e3').innerHTML='expand_more';
        document.querySelector('.e1').innerHTML='expand_more';
        document.querySelector('.e2').innerHTML='expand_more';
        document.querySelector('.e4').innerHTML='expand_more';
        document.querySelector('.fav-list').style.display='none';
 
    }

}


document.querySelector('#list2').style.display='none';
document.querySelector('.filter-rating').style.display='none';
document.querySelector('.filtertype1').addEventListener('click',()=>{
    if(document.querySelector('#list2').style.display=='none'){
        document.querySelector('.filter-rating').style.display='none';
        document.querySelector('#list2').style.display='flex';
    
    }
    else{
        document.querySelector('#list2').style.display='none';
        document.querySelector('.filter-rating').style.display='none';
    }
})

document.querySelector('.filtertype2').addEventListener('click',()=>{
    if(document.querySelector('.filter-rating').style.display=='none'){
        document.querySelector('#list2').style.display='none';
        document.querySelector('.filter-rating').style.display='block';
    }
    else{
        document.querySelector('#list2').style.display='none';
        document.querySelector('.filter-rating').style.display='none';
    }

})
let j=0;
document.querySelector('.show-reports').addEventListener('click',()=>{
    if(document.querySelector('.right-commentbar').style.display=='block'){
        document.querySelector('.show-sidebar-icon').src="images/commentdisable.png";
        document.querySelector('.right-commentbar').style.display="none";
        a++;
    }
    if(j%2==0){
        document.querySelector('.right-reportbar').style.display='none';
    }
    else{
        document.querySelector('.right-reportbar').style.display='block';
    }
    j++;
   
})


function openlogin(){
    user=null;
    localStorage.setItem('user', null);

    window.location.href = 'main.html';
}

function closediv(){

    document.querySelector('.login').style.display='none';
}


const notificationIcon=document.querySelector('.close-notiication-bar');
notificationIcon.addEventListener('click',()=>{
    document.querySelector('.notification-bar').style.display='none';
})

const bellicon=document.querySelector('.bellicon');
bellicon.addEventListener('click',()=>{
    document.querySelector('.notification-bar').style.display='block';
})
