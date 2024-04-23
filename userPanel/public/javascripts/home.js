const detailsbtns=document.querySelectorAll(".detailsBtn");
const detailsModel=document.getElementById("detailsModal");
const closeModal=document.getElementById("closeModal");

detailsbtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        detailsModel.classList.remove("hidden");
        detailsModel.classList.add("block");
        getData(e.target.id)
    });
});

async function getData(id){
    try{
        const response=await fetch(`/vehicleData/${id}`);

        if(!response.ok){
            throw new Error('Failed to fetch data');
        }
        const data=await response.json();
        setValue(data);
    }catch(error){
        console.error(error);
    }

}

function setValue(data){
    let ownerName=document.getElementById("ownerName");
    let ownerPhone=document.getElementById("ownerPhone");
    let vehicleNo=document.getElementById("vehicleNo");
    let engineNo=document.getElementById("engineNo");
    let brand=document.getElementById("brand");
    let regState=document.getElementById("reg_state");
    let chasisNo=document.getElementById("chasisNo");
    let regUpto=document.getElementById("reg_upto");
    let taxPaidUpto=document.getElementById("taxPaidUpto");
    let insurancePaidUpto=document.getElementById("insurancePaidUpto");
    let pucValidUpto=document.getElementById("pucValidUpto");
    let fitUpto=document.getElementById("fit_upto");
    let regDate=new Date(data.reg_upto);
    let taxDate=new Date(data.taxPaidUpto);
    let insuranceDate=new Date(data.insurancePaidUpto);
    let puccDate=new Date(data.pucValidUpto);
    let fitDate=new Date(data.fit_upto);
    ownerName.innerHTML=`${data.ownerName}`;
    ownerPhone.innerHTML=`${data.ownerPhone}`;
    vehicleNo.innerHTML=`${data.vehicleNo}`;
    engineNo.innerHTML=`${data.engineNo}`;
    brand.innerHTML=`${data.brand}`;
    regState.innerHTML=`${data.reg_state}`;
    chasisNo.innerHTML=`${data.chasisNo}`;
    regUpto.innerHTML=`${regDate.getDate()}-${regDate.getMonth()}-${regDate.getFullYear()}`;
    taxPaidUpto.innerHTML=`${taxDate.getDate()}-${taxDate.getMonth()}-${taxDate.getFullYear()}`;
    insurancePaidUpto.innerHTML=`${insuranceDate.getDate()}-${insuranceDate.getMonth()}-${insuranceDate.getFullYear()}`;
    pucValidUpto.innerHTML=`${puccDate.getDate()}-${puccDate.getMonth()}-${puccDate.getFullYear()}`;
    fitUpto.innerHTML=`${fitDate.getDate()}-${fitDate.getMonth()}-${fitDate.getFullYear()}`;
}

closeModal.addEventListener("click",(e)=>{
    e.preventDefault();
    detailsModel.classList.remove("block");
    detailsModel.classList.add("hidden");
});