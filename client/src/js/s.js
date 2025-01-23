var username = document.getElementById("username");
var password = document.getElementById("password");
var secondname = document.getElementById("Secondname");
var email = document.getElementById("email");
var sub_btn = document.getElementById("register");
var alert_name = document.getElementsByClassName("alert");
var checkb = document.querySelector('input[type = "checkbox"]')
var valid = [false,false,false,false];

const xhr = new XMLHttpRequest();


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
      
        xhr.open('GET', 'http://localhost:3000/users');
        // xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

        // check whether the mail exist before or not
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState == 4) { 
                response = JSON.parse(xhr.response);

                if(response.some(user => user.email == email.value)){
                    alert_name[2].innerText = "Email already exists";
                    alert_name[2].classList.remove("hidden");
                    sub_btn.setAttribute("disabled" , "true");
                    valid[2] = false;}
                    else{
                        alert_name[2].classList.add("hidden");
                        valid[2] = true;
                        sub_btn.setAttribute("disabled" , "false");
                        check();
                    }
            }
          });
        

    }
    });

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

    sub_btn.addEventListener("click" , function(e){

        e.preventDefault();
        full_name = username.value + " " + secondname.value;

        var user = {
            
            name : full_name,
            password : password.value,
            email : email.value,
            favourites: []
        };

        xhr.open('POST', 'http://localhost:3000/users');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(user));

        window.location.href = "http://127.0.0.1:5500/Client/public/login.html";
        

    })
    