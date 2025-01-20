var username = document.getElementById("username");
var password = document.getElementById("password");
var secondname = document.getElementById("Secondname");
var email = document.getElementById("email");
var sub_btn = document.getElementById("register");
var alert_name = document.getElementsByClassName("alert");
var checkb = document.querySelector('input[type = "checkbox"]')
var valid = [false,false,false,false];
function check() {
    if (checkb.checked && valid[0] && valid[1] && valid[2] && valid[3]) {
        sub_btn.removeAttribute("disabled");
    } else {
        sub_btn.setAttribute("disabled", "disabled");
    }
}
username.addEventListener("input", function () {
//  logic to check the username length to be more than 1 char

if (username.value.length == 1) {
    alert_name[0].innerText = "Please insert at least 2 characters";
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
});

secondname.addEventListener("input", function () {
    //  logic to check the username length to be more than 1 char
    
    if (secondname.value.length == 1) {
        alert_name[1].innerText = "Please insert at least 2 characters";
        alert_name[1].classList.remove("hidden");
        sub_btn.setAttribute("disabled" , "true");
        valid[1] = false;


        // the next is code to check whether has numbers or special chars
    } else if (/[\d!@#$%^&*(),.?":{}|<>]/.test(secondname.value)) {
        // check if the secondname contains numbers or special characters
        alert_name[1].innerText = "Name should not contain numbers or special characters";
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
    });

email.addEventListener("input", function () {
    //  logic to check the email length to be more than 6 char
    
    if (email.value.length < 6) {
        alert_name[2].innerText = "Please insert at least 6 characters";
        alert_name[2].classList.remove("hidden");
        sub_btn.setAttribute("disabled" , "true");
        valid[2] = false;
    
        // check for gmail
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        alert_name[2].innerText = "Please insert a valid email address";
        alert_name[2].classList.remove("hidden");
        sub_btn.setAttribute("disabled" , "true");
        valid[2] = false;
    
    } else {
        // hide the alert if all conditions are satisfied
        alert_name[2].classList.add("hidden");
        valid[2] = true;
        sub_btn.setAttribute("disabled" , "false");
        check();

    }
    })

    password.addEventListener("input", function () {
        //  logic to check the username length to be more than 1 char
        
        if (password.value.length < 6) {
            alert_name[3].innerText = "Please insert at least 6 characters";
            alert_name[3].classList.remove("hidden");
            sub_btn.setAttribute("disabled" , "true");
            valid[3] = false;
    
            // the next is code to check whether has numbers or special chars
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password.value)) {
            // check if the username contains numbers or special characters
            alert_name[3].innerText = "Password should contain mix of letters ,numbers and special characters";
            alert_name[3].classList.remove("hidden");
            sub_btn.setAttribute("disabled" , "true");
            valid[3] = false;
        
        } else {
            // hide the alert if all conditions are satisfied
            alert_name[3].classList.add("hidden");
            valid[3] = true;
            sub_btn.setAttribute("disabled" , "false");
            check();
    
            }
    })
    checkb.addEventListener("change",function(){
        

        check();
    }
    )

    sub_btn.addEventListener("click" , function(){

        localStorage.setItem('username' , username.value+ " " + secondname.value)

        localStorage.setItem('email' , email.value)
        localStorage.setItem('password' , password.value)


    })
    