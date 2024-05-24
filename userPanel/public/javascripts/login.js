let loginForm=document.getElementById("loginForm");
let errorMessage=document.getElementById("errorMessage");

loginForm.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;

    const data={username,password};

    try {
        const response=await fetch("https://vehicledocs360.onrender.com/adminLogin",{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        });

        const result=await response.json();

        if(result.adminExist==true && result.passMatched==true){
            window.location.href='/verifyotp';
        }else if(result.adminExist==true && result.passMatched==false){
            errorMessage.classList.remove('hidden');
            errorMessage.classList.add('block');
            errorMessage.innerHTML="Password does not matched";
        }else{
            errorMessage.classList.remove('hidden');
            errorMessage.classList.add('block');
            errorMessage.innerHTML="Admin not found";
        }
    } catch (error) {
        console.error(error);
    }
})