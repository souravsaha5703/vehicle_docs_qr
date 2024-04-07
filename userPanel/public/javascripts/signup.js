let errorMessage = document.getElementById("errorMessage");
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let phoneError = document.getElementById("phError");


function checkName() {
    let fullname = document.getElementById("fullname").value.trim();
    if (fullname == '') {
        nameError.innerHTML = "Name can't be empty";
        nameError.classList.remove("hidden");
        nameError.classList.add("block", "text-red-500");
        return false;
    } else if (!fullname.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        nameError.innerHTML = "Please write full name";
        nameError.classList.remove("hidden");
        nameError.classList.add("block", "text-red-500");
        return false;
    } else {
        nameError.classList.add("hidden");
        return true;
    }
}

function checkEmail() {
    let email = document.getElementById("email").value.trim();
    if (email == '') {
        emailError.innerHTML = "Email can't be empty";
        emailError.classList.remove("hidden");
        emailError.classList.add("block", "text-red-500");
        return false;
    } else if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = "Email is invalid";
        emailError.classList.remove("hidden");
        emailError.classList.add("block", "text-red-500");
        return false;
    } else {
        emailError.classList.add("hidden");
        return true;
    }
}

function checkPhone() {
    let phone = document.getElementById("phonenumber").value.trim();
    if (phone == '') {
        phoneError.innerHTML = "Phone Number can't be empty";
        phoneError.classList.remove("hidden");
        phoneError.classList.add("block", "text-red-500");
        return false;
    } else if (phone.length < 10) {
        phoneError.innerHTML = "Phone Number is invalid";
        phoneError.classList.remove("hidden");
        phoneError.classList.add("block", "text-red-500");
        return false;
    } else if (phone.length > 10) {
        phoneError.innerHTML = "Phone Number is invalid";
        phoneError.classList.remove("hidden");
        phoneError.classList.add("block", "text-red-500");
        return false;
    } else if (phone.match(/^[a-zA-Z]+$/)) {
        phoneError.innerHTML = "Phone Number is invalid";
        phoneError.classList.remove("hidden");
        phoneError.classList.add("block", "text-red-500");
        return false;
    } else if(phone.match(/^[0-9]+$/) && phone.length==10 && phone.match(/^[a-zA-Z0-9]+$/)){
        phoneError.classList.add("hidden");
        return true;
    }
}

function validateForm() {
    if (!checkName() || !checkEmail() || !checkPhone()) {
        errorMessage.innerHTML = "Please fill all the fields";
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("block");
        setTimeout(() => {
            errorMessage.classList.remove("block");
            errorMessage.classList.add("hidden");
        }, 3000)
        return false;
    }
    return true;
}
