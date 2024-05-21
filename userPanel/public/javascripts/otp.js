let otpForm=document.getElementById("otpForm");
let errorMessage=document.getElementById("errorMessage");

otpForm.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const otp=document.getElementById("otp").value;

    const data={otp};

    try {
        const response=await fetch("http://localhost:7000/otpverification",{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        });

        const result=await response.json();

        if(result.verified==true){
            window.location.href='/dashboard';
        }else{
            errorMessage.classList.remove('hidden');
            errorMessage.classList.add('block');
            errorMessage.innerHTML="Invalid OTP";
        }
    } catch (error) {
        console.error(error);
    }
})