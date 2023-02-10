//TODO should move the following constants value to separate file
const errorMsgPwd = "Confirm Password is not matching with Password";
const errorMsgEmail = "Please enter valid Email ID";
const errorMsgMobile = "Please enter valid Mobile Number";
const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//add the id as key for field name to be validated
let validationFields = new Map([
    ['firstname', 'FirstName'], ['lastname', 'LastName'], ['dob', 'Date of Birth'],
    ['gender','Gender'],['password','Password'],['confirmPassword','Confirm Password'],
    ['email','Email'],['mobile','Mobile'],['address','Address']
  ]);
let isPhoneValid = false;
let isEmailValid = false;
let isPasswordValid = false;

//validate the entire form field is filled and valid
function validate() {
    let errorMessage = "";
    const plsEnterMessage = "Please Enter ";
    // iterate over key
    for (let fieldKey of validationFields.keys()) { 
        let isValid = validateValue(document.getElementById(fieldKey).value);
        if(!isValid) {
            errorMessage += plsEnterMessage + validationFields.get(fieldKey) + "\n";
        }
    }
    if(errorMessage.length === 0) {
        if(!isEmailValid)
            errorMessage += errorMsgEmail + "\n";
        if(!isPhoneValid)
            errorMessage += errorMsgMobile + "\n";
        if(!isPasswordValid)
            errorMessage += errorMsgPwd + "\n";
    }
    //form validated
    if(errorMessage.length === 0) {
        document.getElementById("confirm").checked = true;
        document.getElementById("submitbtn").disabled = false;
    }
    else {
        document.getElementById("confirm").checked = false;
        document.getElementById("submitbtn").disabled = true;
        alert(errorMessage);
    }   
}

function comparePassword() {
    const pwd = document.getElementById("password").value;
    const confirmPwd = document.getElementById("confirmPassword").value;
    
    if(validateValue(pwd) && validateValue(confirmPwd) && (pwd != confirmPwd)) {
        alert(errorMsgPwd);
        isPasswordValid = false;
    }
    else {
        isPasswordValid = true;
    }  
}

function validateEmail() {
    const email = document.getElementById("email").value;
    if(validateValue(email) && !email.match(emailPattern)) {
        alert(errorMsgEmail);
        isEmailValid = false;
    }
    else {
        isEmailValid = true;
    }
}

function validateNumber() {
    const mobile = document.getElementById("mobile").value;
    if(validateValue(mobile) && (isNaN(mobile) || mobile.length < 10)) {
        alert(errorMsgMobile);
        isPhoneValid = false;
    }
    else {
        isPhoneValid = true;
    }
}

function validateValue(fieldValue) {
    if(!fieldValue || fieldValue.length === 0) {
        return false;
    }
    return true;
}