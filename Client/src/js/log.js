var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");
var alert_name = document.getElementsByClassName("alert");
var sub_btn= document.getElementById("login");
var valid =  [false , false , false]
function check() {
    if (valid[0] && valid[1] && valid[2]) {
        sub_btn.removeAttribute("disabled");
    } else {
        sub_btn.setAttribute("disabled", "disabled");
    }
}

username.addEventListener("input", function () {
    //  logic to check the username length to be more than 1 char
    if (username.value.length <4) {
        alert_name[0].innerText = "Please insert at least 4 characters";
        alert_name[0].classList.remove("hidden");
        sub_btn.setAttribute("disabled" , "true");
        valid[0] = false;
    } else if (/[\d!@#$%^&*(),.?":{}|<>]/.test(username.value)) {
        // check if the username contains numbers or special characters
        alert_name[0].innerText = "Name should not contain numbers or special characters";
        alert_name[0].classList.remove("hidden");
        sub_btn.setAttribute("disabled" , "true");
        valid[0] = false;
    } else {
        // hide the alert if all conditions are satisfied
        alert_name[0].classList.add("hidden");
        valid[0] = true;
        check();
    }
    })
    email.addEventListener("input", function () {
        //  logic to check the email length to be more than 6 char
        if (email.value.length < 6) {
            alert_name[1].innerText = "Please insert at least 6 characters";
            alert_name[1].classList.remove("hidden");
            sub_btn.setAttribute("disabled" , "true");
            valid[1] = false;
        
            // check for gmail
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            alert_name[1].innerText = "Please insert a valid email address";
            alert_name[1].classList.remove("hidden");
            sub_btn.setAttribute("disabled" , "true");
            valid[1] = false;
        
        } else {
            // hide the alert if all conditions are satisfied
            alert_name[1].classList.add("hidden");
            valid[1] = true;
            sub_btn.setAttribute("disabled" , "false");
            check();
    
        }
    })
    password.addEventListener("input" , function(){

        if(password.value.length <6 ){

            alert_name[2].innerText = 'insert at least 6 characters'
            alert_name[2].classList.remove("hidden");
            valid[2] = false;
            sub_btn.setAttribute("disabled" , "true")
        }else{
            alert_name[2].classList.add("hidden");
            valid[2] = true;
            sub_btn.setAttribute("disabled" , "false");
            check();

        }


    })

    sub_btn.addEventListener("click" , function(e){
        e.preventDefault()
       if(email.value !=  localStorage.getItem('email')){ //1st time 
        var par = document.querySelectorAll('p')[0];
        par.classList.add("animate-vibrate")

       }else if(password.value != localStorage.getItem('password')){

        var par = document.querySelectorAll('p')[1];
        par.classList.remove("hidden");
       }//right mail , but wrong password



    })