window.addEventListener("load", function () {
    document.getElementById('Daily').addEventListener('click', drawDailyReport);
    document.getElementById('Monthly').addEventListener('click', drawMonthlyReport);
    let labelEmpName = document.getElementById('employeeName')
    labelEmpName.innerText = getCookie('Name');
});
//===============================================================//
//getting data from Cookie
let fullNameCookie = getCookie('Name');
let mainTable = document.createElement('table');
let userNameCookie = getCookie('userName');

//to parse cookie
function getCookie(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
//===============================================================//
//getting data from local storage
let mainEmployee = JSON.parse(localStorage.getItem("mainEmployee"));
let lStorageAttend = JSON.parse(localStorage.getItem("localAttendance"));
let lStorageDeparture = JSON.parse(localStorage.getItem("localDeparture"));

function drawMonthlyReport() {
    mainTable.innerHTML = "";
    //===============================================================//
    //Creating Table Header
    let headersArr = ['Date', 'Attendance Time', 'Late attend', "Departure Time", "Early Departure"]
    //table headers
    let cTRh = document.createElement('tr');
    if (lStorageAttend.length != 0) {
        for (let i = 0; i < headersArr.length; i++) {
            let cTH = document.createElement('th');
            cTH.innerText = headersArr[i];
            cTRh.appendChild(cTH);
        }
      } else {
        let ifEmpty = document.createElement("td");
        ifEmpty.innerText = `You're not in yet !`;
        cTRh.appendChild(ifEmpty);
      }
      mainTable.appendChild(cTRh);

    //Attendance Array For Every User
    let attendanceArr = [];
    for (let i = 0; i < lStorageAttend.length; i++) {
        if (lStorageAttend[i].username == userNameCookie) {
            attendanceArr.push(lStorageAttend[i]) 
        }
    }

    //Departure Array 
    let departureArr = [];
    for (let i = 0; i < lStorageDeparture.length; i++) {
        if (lStorageDeparture[i].username == userNameCookie) {
            departureArr.push(lStorageDeparture[i]) 
        }
    }

    //TODO: attendance here will be wrong if some one came but didn't leave
    //===============================================================//
    //Creating Table Data
        //Getting Table Data from attendance
    for (let i = 0; i < attendanceArr.length; i++) {
        let cTR = document.createElement('tr');
        //data in array
        for (let s in attendanceArr[i]) {
            if (s != 'username') {
                if (attendanceArr[i].username == userNameCookie) {
                    let cTD = document.createElement('td');
                    cTD.innerText = attendanceArr[i][s];
                    cTR.appendChild(cTD);
                }
            }
        }
        //Creating Table Data from departure
    for (let s in departureArr[i]) {
            if (s != 'username' && s != 'Date') {
                if (departureArr[i].username == userNameCookie) {
                    let cTD = document.createElement('td');
                    cTD.innerText = departureArr[i][s];
                    cTR.appendChild(cTD);
                }
            }
        }
        mainTable.appendChild(cTR)
    }
    document.getElementById('table').appendChild(mainTable);
}


function drawDailyReport() {
    mainTable.innerHTML = "";
    //===============================================================//
    //Getting time
    let currentdate = new Date();
    let day = currentdate.getDate();
    let year = currentdate.getFullYear();
    let month = currentdate.getMonth();
    let currentDate = `${day}-${month + 1}-${year}`;
    //===============================================================//
    //Creating Table Data
    let cTRh = document.createElement('tr');
    if (lStorageAttend.length != 0) {
        
    for (let i = 0; i < lStorageAttend.length; i++) {
        let cTR = document.createElement('tr');
        //Getting Data from attendance
        if (lStorageAttend[i].username == userNameCookie && lStorageAttend[i].Date === currentDate) {
            if (lStorageAttend[i].LateAttend == true) {
                let cTD = document.createElement('td');
                cTD.innerText = `${fullNameCookie}, you are late today :(`;
                cTR.appendChild(cTD);
            } else {
                let cTD = document.createElement('td');
                cTD.innerText = `Thank you for coming on time, ${fullNameCookie} Have a good day`;
                cTR.appendChild(cTD);
            }
            mainTable.appendChild(cTR)
        }
    }
    //Getting Data from Departure
    for (let i = 0; i < lStorageDeparture.length; i++) {
        let cTR = document.createElement('tr');
        if (lStorageDeparture[i].username == userNameCookie && lStorageDeparture[i].date === currentDate) {
            if (lStorageDeparture[i].EarlyDeparture == true) {
                let cTD = document.createElement('td');
                cTD.innerText = `${fullNameCookie}, why you are leaving early ????!?!`;
                cTR.appendChild(cTD);
            } else {
                let cTD = document.createElement('td');
                cTD.innerText = `See you tomorrow, ${fullNameCookie} Have a good day`;
                cTR.appendChild(cTD);
            }
            mainTable.appendChild(cTR)
        }
    }
        
      } else {
        let ifEmpty = document.createElement("td");
        ifEmpty.innerText = `You're not in yet !`;
        cTRh.appendChild(ifEmpty);
      }
      mainTable.appendChild(cTRh);


    document.getElementById('table').appendChild(mainTable);
}
