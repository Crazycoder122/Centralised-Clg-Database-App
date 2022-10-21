
const studentPanel = document.getElementById('student-panel');
const teacherPanel = document.getElementById('teacher-panel');
const employeePanel = document.getElementById('employee-panel');

let studentData = [];
let teacherData = [];
let employeeData = [];

const URL = {
'student' : "https://college-database-backend.herokuapp.com/student",
'teacher' : "https://college-database-backend.herokuapp.com/teacher",
'employee' : "https://college-database-backend.herokuapp.com/nonTeacher"
}

const getData = async (type) => {
const res = await (await(fetch(URL[type]))).json();

console.log(res);
}


const populate = (data,element) => {

}


window.addEventListener('load',async () => {
studentData = await getData('student');
teacherData = await getData('teacher');
employeeData = await getData('employee');

populate(studentData,studentPanel);
populate(teacherData,teacherPanel);
populate(employeeData,employeePanel);
})
