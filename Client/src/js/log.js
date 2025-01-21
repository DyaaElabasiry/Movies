var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");
var alert_name = document.getElementsByClassName("alert");
var sub_btn= document.getElementById("login");
var valid =  [false , false , false]

var par0 = document.querySelectorAll('p')[0];
var par1 = document.querySelectorAll('p')[1];


var xhr = new XMLHttpRequest();
/**
 * Checks the validity of the form fields and enables or disables
 * the submit button accordingly. If all fields are valid, the button
 * is enabled; otherwise, it is disabled.
 */

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


        xhr.open('GET', 'http://localhost:3000/users');
        xhr.send();

        xhr.addEventListener('readystatechange', function () {
            par0.classList.remove("animate-vibrate");
            if (xhr.readyState == 4) { 

                response = JSON.parse(xhr.response);
                var user = response.find(user => user.email == email.value); //return object of the first appearence
                console.log("test");
                if(user){       // if the user has signed up

                    if(user.password != password.value){        // check if the password is wrong
                        par1.classList.remove("hidden");
                        
                    }
                }
                
                else{          // the user hasn't signed up 
                    par0.classList.add("animate-vibrate")
                    
                    }   
                
        }
        });


    });