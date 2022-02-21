let mainTable = document.createElement('table');

window.addEventListener('load', function () {
    document.getElementById('drawEmployees').addEventListener('click', drawEmployees);
    document.getElementById('fullRep').addEventListener('click', drawFullReport);
    document.getElementById('lateRep').addEventListener('click', drawLateReport);
    document.getElementById('excuseRep').addEventListener('click', drawExcuse);
    document.getElementById('drawPending').addEventListener('click', drawPending);
}); //end of load

//getting data from local storage
let mainEmployee = JSON.parse(localStorage.getItem("mainEmployee"));
let lStoragePending = JSON.parse(localStorage.getItem("Pending"));
let lStorageAttend = JSON.parse(localStorage.getItem("localAttendance"));
let lStorageDeparture = JSON.parse(localStorage.getItem("localDeparture"));

// All Functions needed
//To show all employees Data
function drawEmployees() {
    let arr = ['FirstName', 'LastName', 'Address', 'Position', "E-Mail", "Age", "Remove User"]
    mainTable.innerHTML = "";
    //table headers
    let cTRh = document.createElement('tr');
    for (let s in arr) {
        let cTH = document.createElement('th');
       cTH.innerText = arr[s].toUpperCase();
       cTRh.appendChild(cTH);
       }
    mainTable.appendChild(cTRh);
    for (let i = 0; i < mainEmployee.length; i++) {
        let cTR = document.createElement('tr');
        //data in array
        for (let s in mainEmployee[i]) {
            if (s != 'username' && s != "password") {
                let cTD = document.createElement('td');
                cTD.innerText = mainEmployee[i][s];
                cTR.appendChild(cTD);
            }
        }
        let denyTD = document.createElement('td');
        denyTD.innerHTML = `<img src="../Assets/deny.png" id="denyImg" alt="">`;
        cTR.appendChild(denyTD);
        denyTD.firstChild.addEventListener('click', denyMainEmp)
        // append created tr with table
        mainTable.appendChild(cTR);
    }
    document.getElementById('table').appendChild(mainTable);
}


//Function to show the full report
function drawFullReport() {
    let arr = ['FirstName', 'LastName', 'Day', "AttendanceTime", "LateAttendance", "DepartureTime", "EarlyDeparture"]
    mainTable.innerHTML = "";
    //table headers
    let cTRh = document.createElement('tr');
    if (lStorageAttend.length != 0 && lStorageDeparture.length != 0) {
        for (let s in arr) {
         let cTH = document.createElement('th');
        cTH.innerText = arr[s].toUpperCase();
        cTRh.appendChild(cTH);
        }
      } else {
        let ifEmpty = document.createElement("td");
        ifEmpty.innerText = `There are no employees left early or late`;
        cTRh.appendChild(ifEmpty);
      }
      mainTable.appendChild(cTRh);

    for (let i = 0; i < mainEmployee.length; i++) {
        for (let j = 0; j < lStorageAttend.length; j++) {
            if (mainEmployee[i].username == lStorageAttend[j].username) {
                let cTR = document.createElement('tr');
                let fName = document.createElement('td');
                fName.innerText = mainEmployee[i].FirstName;
                cTR.appendChild(fName);
                let lName = document.createElement('td');
                lName.innerText = mainEmployee[i].LastName;
                cTR.appendChild(lName);
                let date = document.createElement('td');
                let Time = document.createElement('td');
                let late = document.createElement('td');
                date.innerText = lStorageAttend[j].Date;
                cTR.appendChild(date);
                Time.innerText = lStorageAttend[j].Time;
                cTR.appendChild(Time);
                late.innerText = lStorageAttend[j].LateAttend;
                cTR.appendChild(late);
                for (let d in lStorageDeparture) {
                    if (lStorageDeparture[d].username == lStorageAttend[j].username && lStorageDeparture[d].Date == lStorageAttend[j].Date) {
                        let Timed = document.createElement('td');
                        let early = document.createElement('td');
                        Timed.innerText = lStorageDeparture[d].Time
                        cTR.appendChild(Timed);
                        early.innerText = lStorageDeparture[d].EarlyDeparture;
                        cTR.appendChild(early);
                    }
                }
                mainTable.appendChild(cTR);
            }

        }

    }
    document.getElementById('table').appendChild(mainTable);
}


//Function to show late report
function drawLateReport() {
    let arr = ['FirstName', 'LastName', 'Day', "AttendanceTime", "LateAttendance"]
    mainTable.innerHTML = "";
    //table headers
    let cTRh = document.createElement('tr');
    if (lStorageAttend.length != 0) {
        for (let s in arr) {
         let cTH = document.createElement('th');
        cTH.innerText = arr[s].toUpperCase();
        cTRh.appendChild(cTH);
        }
      } else {
        let ifEmpty = document.createElement("td");
        ifEmpty.innerText = `There are no late employees `;
        cTRh.appendChild(ifEmpty);
      }
      mainTable.appendChild(cTRh);

    for (let i = 0; i < mainEmployee.length; i++) {
        for (let j = 0; j < lStorageAttend.length; j++) {
            if (mainEmployee[i].username == lStorageAttend[j].username && lStorageAttend[j].LateAttend == true) {
                let cTR = document.createElement('tr');
                let fname = document.createElement('td');
                fname.innerText = mainEmployee[i].FirstName;
                cTR.appendChild(fname);
                let lName = document.createElement('td');
                lName.innerText = mainEmployee[i].FirstName;
                cTR.appendChild(lName);
                let date = document.createElement('td');
                let Time = document.createElement('td');
                let late = document.createElement('td');
                date.innerText = lStorageAttend[j].Date;
                cTR.appendChild(date);
                Time.innerText = lStorageAttend[j].Time;
                cTR.appendChild(Time);
                late.innerText = lStorageAttend[j].LateAttend;
                cTR.appendChild(late);
                mainTable.appendChild(cTR);
            }

        }
    }
    document.getElementById('table').appendChild(mainTable);
}


//Function to show excuse report
function drawExcuse() {
    let arr = ['FirstName', 'LastName', 'Day', "DepartureTime", "EarlyDeparture"]
    mainTable.innerHTML = "";
    //table headers
    let cTRh = document.createElement('tr');
    if (lStorageDeparture.length != 0) {
        for (let s in arr) {
         let cTH = document.createElement('th');
        cTH.innerText = arr[s].toUpperCase();
        cTRh.appendChild(cTH);
        }
      } else {
        let ifEmpty = document.createElement("td");
        ifEmpty.innerText = `There are no employees left early`;
        cTRh.appendChild(ifEmpty);
      }
      mainTable.appendChild(cTRh);

    for (let i = 0; i < mainEmployee.length; i++) {
        for (let j = 0; j < lStorageDeparture.length; j++) {
            if (mainEmployee[i].username == lStorageDeparture[j].username && lStorageDeparture[j].EarlyDeparture == true) {
                let cTR = document.createElement('tr');
                let fName = document.createElement('td');
                fName.innerText = mainEmployee[i].FirstName;
                cTR.appendChild(fName);
                let lName = document.createElement('td');
                lName.innerText = mainEmployee[i].FirstName;
                cTR.appendChild(lName);
                let date = document.createElement('td');
                let Time = document.createElement('td');
                let late = document.createElement('td');
                date.innerText = lStorageDeparture[j].Date;
                cTR.appendChild(date);
                Time.innerText = lStorageDeparture[j].Time;
                cTR.appendChild(Time);
                late.innerText = lStorageDeparture[j].EarlyDeparture;
                cTR.appendChild(late);
                mainTable.appendChild(cTR);
            }
        }
    }
    document.getElementById('table').appendChild(mainTable);
}


//Function to draw the pending employees table 
function drawPending() {
    mainTable.innerHTML = "";
    let cTRh = document.createElement('tr');
    if (lStoragePending.length != 0) {
        for (let s in lStoragePending[0]) {
            if (s != 'username' && s != "password") {
                let cTH = document.createElement('th');
                cTH.innerText = s.toUpperCase();
                cTRh.appendChild(cTH);
            }
        }
        let moreHs = document.createElement('th');
        moreHs.innerText = 'Approve';
        cTRh.appendChild(moreHs);

        let moreHss = document.createElement('th');
        moreHss.innerText = 'Delete';
        cTRh.appendChild(moreHss);

        mainTable.appendChild(cTRh);
    } else {
        let ifEmpty = document.createElement('td');
        ifEmpty.innerText = ` There are no pending users `
        mainTable.appendChild(cTRh);
        cTRh.appendChild(ifEmpty);
    }


    for (let i = 0; i < lStoragePending.length; i++) {
        let cTR = document.createElement('tr');
        //data in array
        for (let s in lStoragePending[i]) {
            if (s != 'username' && s != "password") {
                let cTD = document.createElement('td');
                cTD.innerText = lStoragePending[i][s];
                cTD.nodeValue = lStoragePending[i][s];
                cTR.appendChild(cTD);
            }
        }
        let approveTD = document.createElement('td');
        approveTD.innerHTML = `<img src="../Assets/approve.png" id="approveImg" alt="">`;
        cTR.appendChild(approveTD);
        approveTD.firstChild.addEventListener('click', approveEmp)
        let denyTD = document.createElement('td');
        denyTD.innerHTML = `<img src="../Assets/deny.png" id="denyImg" alt="">`;
        cTR.appendChild(denyTD);
        denyTD.firstChild.addEventListener('click', denyEmp)
        mainTable.appendChild(cTR);
    }
    document.getElementById('table').appendChild(mainTable);
}

//Function to approve and send 'Mail' to the approved user
function approveEmp() {

    let targetedTR = this.parentNode.parentNode
    let table = targetedTR.parentNode
    let targetedMail = targetedTR.children[4].innerText
    let targetedUserFname = targetedTR.children[0].innerText
    let targetedUserLname = targetedTR.children[1].innerText
    if (confirm(`Approving ${targetedUserFname} ${targetedUserLname}, Are you sure ?`)) {
        for (let i = 0; i < lStoragePending.length; i++) {
            if (targetedMail === lStoragePending[i].email) {
                let data = {
                    service_id: 'service_q47wiwo',
                    template_id: 'template_3jxhesh',
                    user_id: 'user_BJD3fjQNKA832RZisxjBH',
                    template_params: lStoragePending[i]
                }

                alert('Sending mail to employee, Please wait!')
                $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).done(function () {
                    alert('Your mail is sent!');
                    mainEmployee.push(lStoragePending[i]);
                    localStorage.setItem("mainEmployee", JSON.stringify(mainEmployee));
                    lStoragePending.splice(i, 1)
                    localStorage.setItem("Pending", JSON.stringify(lStoragePending));
                    table.removeChild(targetedTR)
                    alert(`${targetedUserFname} ${targetedUserLname} approved`);
                }).fail(function (error) {
                    alert('Oops... ' + JSON.stringify(error));
                });

            }
        }
    } else {
        alert(`${targetedUserFname} ${targetedUserLname} is Waiting for your approval `);
    }
}

//Function to deny and remove user from pending array
function denyEmp() {
    let targetedTR = this.parentNode.parentNode
    let table = targetedTR.parentNode
    let targetedMail = targetedTR.children[4].innerText
    let targetedUserFname = targetedTR.children[0].innerText
    let targetedUserLname = targetedTR.children[1].innerText
    if (confirm(`Denying ${targetedUserFname} ${targetedUserLname} request, Are you sure ?`)) {
        for (let i = 0; i < lStoragePending.length; i++) {
            if (targetedMail === lStoragePending[i].email) {
                lStoragePending.splice(i, 1)
                localStorage.setItem("Pending", JSON.stringify(lStoragePending));
                table.removeChild(targetedTR)
                alert(`${targetedUserFname} ${targetedUserLname} Request Denied`);
            }
        }
    } else {
        alert(`${targetedUserFname} ${targetedUserLname} is Waiting for your approval `);
    }
}

//Function to deny and remove user from the array
function denyMainEmp() {
    let targetedTR = this.parentNode.parentNode
    let table = targetedTR.parentNode
    let targetedMail = targetedTR.children[4].innerText
    let targetedUserFname = targetedTR.children[0].innerText
    let targetedUserLname = targetedTR.children[1].innerText
    if (targetedMail == 'admin@admin.com' || targetedMail == 'security@security.com') {
        alert(`You don't have the permission`)
        return;
    }

    if (confirm(`Deleting ${targetedUserFname} ${targetedUserLname} ,Are you sure ?`)) {
        for (let i = 0; i < mainEmployee.length; i++) {
            if (targetedMail === mainEmployee[i].email) {
                mainEmployee.splice(i, 1)
                localStorage.setItem("mainEmployee", JSON.stringify(mainEmployee));
                table.removeChild(targetedTR)
                alert(`${targetedUserFname} ${targetedUserLname} deleted`);
            }
        }
    }else{
        alert(`Didn't delete ${targetedUserFname} ${targetedUserLname}`)
    }
}