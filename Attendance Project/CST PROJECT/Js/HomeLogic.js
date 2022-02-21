import { Employees } from '../src/Employees.js'


if (localStorage.getItem("mainEmployee") === null) {
    localStorage.setItem("mainEmployee", JSON.stringify(Employees))
}
if (localStorage.getItem("localAttendance") === null) {
    localStorage.setItem("localAttendance", JSON.stringify([]))
}
if (localStorage.getItem("localDeparture") === null) {
    localStorage.setItem("localDeparture", JSON.stringify([]))
}

if (localStorage.getItem("Pending") === null) {
    localStorage.setItem("Pending", JSON.stringify([]))
}