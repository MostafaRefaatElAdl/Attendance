window.addEventListener("load", function() {
    document.getElementById('submit').addEventListener('click', getInfo);
});


function getInfo() {
    //getting user inputs
    let userName = document.getElementById('username').value;
    let passWord = document.getElementById('password').value;
    let errorMsg = document.getElementById('usernameOrPassWrong')
    //===============================================================//
    //getting data from local storage
    let localEmployees = JSON.parse(localStorage.getItem("mainEmployee"));

    //===============================================================//
    //Navigating users throw pages
    for (let i = 0; i < localEmployees.length; i++) {
        // check is user input matches username and password of a current index of the objPeople array
        if (userName == localEmployees[i].username && passWord == localEmployees[i].password) {
            if (localEmployees[i].position === "admin") {
                redirect("../Html/AdminProfile.html");
            } else if (localEmployees[i].position === "security") {
                redirect("../Html/SecurityPage.html");
            } else {
                document.cookie = `Name=${localEmployees[i].FirstName} ${localEmployees[i].LastName};`;
                document.cookie = `userName=${localEmployees[i].username};`;
                redirect("../Html/EmployeeProfile.html");
            }
            errorMsg.style.display = "none";
            // stop the function if this is found to be true
            return;
        }
    }
    errorMsg.style.display = "block";
}
//===============================================================//
//Redirection Function 
function redirect(url) {
    window.location.href = url;
};