
//event listen on load to get drop down list data with the function
window.addEventListener('load', function() {
    let btncheck = this.document.getElementById('confirmAttendance');
    btncheck.addEventListener('click', attendEmp);
})

//===============================================================//
//Getting data from local storage
let mainEmployeesList = JSON.parse(localStorage.getItem("mainEmployee"));
let dep = JSON.parse(localStorage.getItem("localDeparture"))
let att = JSON.parse(localStorage.getItem("localAttendance"))

//creating the drop down list 
let mylist = document.getElementById("empList");
for (let i = 0; i < mainEmployeesList.length; i++) {
    if (mainEmployeesList[i].position == "security" || mainEmployeesList[i].position == "admin") {
        continue;
    }
    let newOption = document.createElement('option')
        newOption.innerText = mainEmployeesList[i].username;
        mylist.appendChild(newOption)

}
//Creating Starting hours
const dayStartHours = 8;
const dayEndHours = 15;
//Initializing early and late flags by false
let earlyDeparture = false
let lateAttend = false;
    
//when click confirm attendance function
function attendEmp() {
    //Getting entered value
    let securityEnteredValue = document.getElementById('empList').value;
    //Getting Time values
    let currentdate = new Date();
    let day = currentdate.getDate();
    let year = currentdate.getFullYear();
    let month = currentdate.getMonth();
    let hours = currentdate.getHours();
    let min = currentdate.getMinutes();
    let date = `${day}-${month + 1}-${year}`;
    let time = `${hours}:${min}`;

    //Validation if attendance data is empty
    if (localStorage.getItem("localAttendance") === null) {
        localStorage.setItem("localAttendance", JSON.stringify([]))
    }
    //Validation if departure data is empty
    if (localStorage.getItem("localDeparture") === null) {
        localStorage.setItem("localDeparture", JSON.stringify([]))
    }

    for (let i = 0; i < mainEmployeesList.length; i++) {
        //check if he is even an employee 
        if (securityEnteredValue == mainEmployeesList[i].username) {
            state(securityEnteredValue,date,time,hours);
        } else {
            continue;
        }
    }
}

//check if emp check in or out 
function state(securityEnteredValue,date,time,hours) {
    for (let j = 0; j < att.length; j++) {
        //if the emp entered for the 2nd time in the same day
        if (att[j].Date === date && att[j].username === securityEnteredValue) {
            //check if the emp is already checked out 
            for (let i = 0; i < dep.length; i++) {
                if (dep[i].Date === date && dep[i].username === securityEnteredValue) {
                    alert("You already checked out ")
                    return;
                }
            }
            departure(securityEnteredValue,date,time,hours);
            return;
        }
    }
    check_in(securityEnteredValue,date,time,hours);
}

function check_in(securityEnteredValue,date,time,hours) {
    lateAttend = false;
    //early depature code 
    if (hours < dayEndHours && hours > dayStartHours) {
        lateAttend = true;
    }
    att.push({
        username: securityEnteredValue,
        Date: date,
        Time: time,
        LateAttend: lateAttend,
    });
    localStorage.setItem("localAttendance", JSON.stringify(att))
    setTimeout(departure, 2.52e+7);
    alert(" Check in ")
}

function departure(securityEnteredValue,date,time,hours) {
    earlyDeparture = false;
    if (hours < dayEndHours && hours > dayStartHours) {
        earlyDeparture = true;
    }
    dep.push({
        username: securityEnteredValue,
        Date: date,
        Time: time,
        EarlyDeparture: earlyDeparture,
    });
    localStorage.setItem("localDeparture", JSON.stringify(dep))
    alert(" Check out ")
}