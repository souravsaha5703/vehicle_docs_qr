const updatebtns=document.querySelectorAll(".updateBtn");
const updateModel=document.getElementById("updateModal");
const closeModal=document.getElementById("closeModal");

updatebtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        updateModel.classList.remove("hidden");
        updateModel.classList.add("block");
        getData(e.target.id);
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
    let regDate=new Date(data.reg_upto);
    let taxDate=new Date(data.taxPaidUpto);
    let insuranceDate=new Date(data.insurancePaidUpto);
    let puccDate=new Date(data.pucValidUpto);
    let fitDate=new Date(data.fit_upto);
    let permitDate=new Date(data.permitValidupto);
    let formattedRegDate=regDate.toISOString().split('T')[0];
    let formattedTaxPaidDate=taxDate.toISOString().split('T')[0];
    let formattedInsurancePaidDate=insuranceDate.toISOString().split('T')[0];
    let formattedPuccDate=puccDate.toISOString().split('T')[0];
    let formattedFitDate=fitDate.toISOString().split('T')[0];
    let formattedPermitDate=permitDate.toISOString().split('T')[0];
    document.getElementById("pollutionUpto").value=formattedPuccDate;
    document.getElementById("registrationUpto").value=formattedRegDate;
    document.getElementById("taxpaidUpto").value=formattedTaxPaidDate;
    document.getElementById("insurancepaidUpto").value=formattedInsurancePaidDate;
    document.getElementById("fitUpto").value=formattedFitDate;
    document.getElementById("permitUpto").value=formattedPermitDate;
    document.getElementById("vehicleId").value=data._id;
}

closeModal.addEventListener("click",(e)=>{
    e.preventDefault();
    updateModel.classList.remove("block");
    updateModel.classList.add("hidden");
});


document.getElementById("updateForm").addEventListener('submit',(e)=>{
    e.preventDefault();
    let id=document.getElementById("vehicleId").value;
    let pollutionUpto=document.getElementById("pollutionUpto").value;
    let registrationUpto=document.getElementById("registrationUpto").value;
    let taxpaidUpto=document.getElementById("taxpaidUpto").value;
    let insurancePaidUpto=document.getElementById("insurancepaidUpto").value;
    let fitUpto=document.getElementById("fitUpto").value;
    let permitvalidupto=document.getElementById("permitUpto").value;

    const updatedVehicleData={pollutionUpto,registrationUpto,taxpaidUpto,insurancePaidUpto,fitUpto,permitvalidupto};

    fetch(`/updateVehicle/${id}`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(updatedVehicleData)
    })
    .then(res=>{
        if(res.redirected){
            window.location.href=res.url;
        }
    })
    .catch(error=>{
        console.error(error);
    });
});