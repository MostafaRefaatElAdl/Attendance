import { newUsers } from '../src/NewUsers.js'

window.addEventListener("load", function () {
    document.getElementById('register').addEventListener('click', registerUser);
});

function registerUser() {
    //getting user inputs
    let inputFirstName = document.getElementById('firstname')
    let inputLastName = document.getElementById('lastname')
    let inputAddress = document.getElementById('address')
    let inputMail = document.getElementById('email')
    let inputAge = document.getElementById('age')

    let userFirstName = inputFirstName.value
    let userLastName = inputLastName.value
    let userAddress = inputAddress.value
    let userMail = inputMail.value.toLowerCase()
    let userAge = inputAge.value
//===============================================================//
    //getting error msgs
    let mailError = document.getElementById('mailError');
    let mailDError = document.getElementById('mailDError');
    let mailPError = document.getElementById('mailPError');
    let fNameError = document.getElementById('fNameError');
    let lNameError = document.getElementById('lNameError');
    let addressError = document.getElementById('addressError');
    let ageError = document.getElementById('ageError');
    let userAddedMsg = document.getElementById('userAdded');
//===============================================================//
    //getting data from local storage
    let mainEmployee = JSON.parse(localStorage.getItem("mainEmployee"));
    let pendingEmployee = JSON.parse(localStorage.getItem("Pending"));
//===============================================================//
    //generated User & pass
    let randomString = Math.random().toString(36).slice(-5);
    let generatedUserName = userFirstName + randomString
    let randomPassword = Math.random().toString(36).slice(-8);
//===============================================================//
//Validation
    //Mail Validation
    if (userMail === "" || !userMail.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
        mailError.style.display = "block";
        inputMail.style.border = "2px solid tomato";
        inputMail.select();
        inputMail.focus();
        // stop the statement if result is found true
        return;
    } else {
        mailError.style.display = "none";
        inputMail.style.border = "2px solid green";
    }
    //validation of registered user Fname
    if (userFirstName === "") {
        fNameError.style.display = "block";
        inputFirstName.style.border = "2px solid tomato";
        inputFirstName.select();
        inputFirstName.focus();
        // stop the statement if result is found true
        return;
    } else {
        fNameError.style.display = "none";
        inputFirstName.style.border = "2px solid green";
    }
    //validation of registered user Lname
    if (userLastName === "") {
        lNameError.style.display = "block";
        inputLastName.style.border = "2px solid tomato";
        inputLastName.select();
        inputLastName.focus();
        // stop the statement if result is found true
        return;
    } else {
        lNameError.style.display = "none";
        inputLastName.style.border = "2px solid green";
    }
    //validation of address
    if (userAddress === "") {
        addressError.style.display = "block";
        inputAddress.style.border = "2px solid tomato";
        inputAddress.select();
        inputAddress.focus();
        // stop the statement if result is found true
        return;
    } else {
        addressError.style.display = "none";
        inputAddress.style.border = "2px solid green";
    }
    //validation of age
    if (userAge === "") {
        ageError.style.display = "block";
        inputAge.style.border = "2px solid tomato";
        inputAge.select();
        inputAge.focus();
        // stop the statement if result is found true
        return;
    } else {
        ageError.style.display = "none";
        inputAge.style.border = "2px solid green";
    }
//===============================================================//
//Duplication Validation
    //Registered users Validation
    for (let i = 0; i < mainEmployee.length; i++) {
        // check if new username is equal to any already created usernames
        if (userMail === mainEmployee[i].email) {
            mailDError.style.display = "block";
            inputMail.style.border = "2px solid tomato";
            inputMail.select();
            inputMail.focus();
            // stop the statement if result is found true
            return;
        } else {
            mailDError.style.display = "none";
            inputMail.style.border = "2px solid green";
        }
    }
    //Pending users Validation
    for (let j = 0; j < pendingEmployee.length; j++) {
        // check if new username is equal to any already created usernames
        if (userMail === pendingEmployee[j].email) {
            mailPError.style.display = "block";
            userAddedMsg.style.display = "none";

            // stop the statement if result is found true
            return;
        } else {
            mailPError.style.display = "none";
            inputMail.style.border = "2px solid green";
        }
    }
//===============================================================//
    //Pushing new users to pending array
    let newUser = {
        username: generatedUserName,
        password: randomPassword,
        FirstName: userFirstName,
        LastName: userLastName,
        address: userAddress,
        position: "Employee",
        email: userMail,
        age: userAge,
    }

    pendingEmployee.push(newUser);
    localStorage.setItem("Pending", JSON.stringify(pendingEmployee));
//===============================================================//
    //Successful Registered msg !
    userAddedMsg.style.display = "block";
    userAddedMsg.style.color = "green";
}


