function showreport(){
    fetch('location.json?' + Date.now())
.then(response => response.json())
.then(data => {
  data.forEach(chargepoint => {

               if(chargepoint.reports!=null){
                let def_count=0,occupied_count=0,exsist_count=0,slow_count=0,unhyg_count=0;
                const reportbar = document.createElement('div');
                const reportminibar = document.createElement('div');
                reportminibar.className='report-minifooter';
                reportbar.className='reportbar';
                const reportheader = document.createElement('div');        
                reportheader.innerHTML =`
                <div style="display:flex;justify-content:space-between;">
                    <h2>${chargepoint.name}</h2><div class="report-btns"><span onclick="go('${chargepoint.id}')" class="material-symbols-outlined">
                    map
                    </span><span onclick="removebyreport('${chargepoint.id}')" class="material-symbols-outlined">
                    delete
                    </span></div>
                </div>
                `;
                reportbar.appendChild(reportheader);

            chargepoint.reports.forEach(report => {
                const reportmain = document.createElement('div');
                reportmain.className='report-main';
                if(report.report=='Defective')
                    def_count++;
                else if(report.report=='Station Occupied')
                    occupied_count++;
                else if(report.report=="Station Doesn't Exsist")
                    exsist_count++;
                else if(report.report=='Slow')
                    slow_count++;
                else if(report.report=='Unhygienic')
                    unhyg_count++;
                reportmain.innerHTML =`
                  <b>${report.name} ${report.date}</b><br><b>${report.report}</b>
                `;
                reportbar.appendChild(reportmain);
            })
            if(def_count>0)
            {
                const reportmini = document.createElement('div');
                reportmini.className='reportmini';
                reportmini.innerHTML=`<b>Defective ${def_count}</b>`;
                reportminibar.appendChild(reportmini);
            }
            if(occupied_count>0)
            {
                const reportmini = document.createElement('div');
                reportmini.className='reportmini';
                reportmini.innerHTML=`<b>Station Occupied ${occupied_count}</b>`;
                reportminibar.appendChild(reportmini);
            }
            if(exsist_count>0)
            {
                const reportmini = document.createElement('div');
                reportmini.className='reportmini';
                reportmini.innerHTML=`<b>Doesn't Exsist ${exsist_count}</b>`;
                reportminibar.appendChild(reportmini);
            }
            if(slow_count>0)
            {
                const reportmini = document.createElement('div');
                reportmini.className='reportmini';
                reportmini.innerHTML=`<b>Slow ${slow_count}</b>`;
                reportminibar.appendChild(reportmini);
            }
            if(unhyg_count>0)
            {
                const reportmini = document.createElement('div');
                reportmini.className='reportmini';
                reportmini.innerHTML=`<b>Unhygienic ${unhyg_count}</b>`;
                reportminibar.appendChild(reportmini);
            }
            reportbar.appendChild(reportminibar);



            document.querySelector('.report-main').appendChild(reportbar);
          }


})
})
}
showreport();
function removebyreport(idToRemove){

    document.cookie = "idToRemove=" + encodeURIComponent(idToRemove);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Do something with the response
      }
    };
    xhttp.open("POST", "removebyreport.php", true);
    xhttp.send();
    document.querySelector('.report-main').innerHTML='';
setTimeout(()=>{
    showreport();
},300)

}