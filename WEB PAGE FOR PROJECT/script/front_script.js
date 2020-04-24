

function validate(){

    console.log("validating");
    let user = document.getElementById("inputEmail3");
    let mail = document.getElementById("inputPassword3");

    if(user.value === "shivanijadon98@gmail.com" &&
        mail.value === "#comfyhome")
    {
        console.log("valid")
        return true;
    }
    else
    {
        console.log("invalid")
        alert("invalid email or password");
        return false;
    }    
}

var btn = document.getElementById("log_btn");
btn.addEventListener('click', redirect);

function redirect(){
    
    var target = document.getElementById("iot_form");
    if(validate())
    {
        target.action = "html/camera.html";
        target.submit();
    }
}