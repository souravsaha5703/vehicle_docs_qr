window.onload=()=>{
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    if(month<10){
        month='0'+month;
    }
    if(day<10){
        day='0'+day;
    }
    
    var maxDate = year + '-' + month + '-' + day;

    var registrationUpto = document.getElementById('registrationUpto');
    var taxpaidUpto = document.getElementById('taxpaidUpto');
    var insurancepaidUpto = document.getElementById('insurancepaidUpto');
    var pollutionUpto = document.getElementById('pollutionUpto');
    registrationUpto.setAttribute('min', maxDate);
    taxpaidUpto.setAttribute('min', maxDate);
    insurancepaidUpto.setAttribute('min', maxDate);
    pollutionUpto.setAttribute('min', maxDate);
}