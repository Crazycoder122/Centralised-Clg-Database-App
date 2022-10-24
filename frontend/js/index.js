const contentPanel = document.getElementById("content-panel");
const updateFormSubmit = document.getElementById('update-submit');

const navLink = document.getElementsByClassName("nav-link");
const updateForm = document.getElementById('update-form');
let activeLink = "student";

let studentData = [];
let teacherData = [];
let employeeData = [];

const URL = {
  student: "https://college-database-backend.herokuapp.com/student",
  teacher: "https://college-database-backend.herokuapp.com/teacher",
  employee: "https://college-database-backend.herokuapp.com/nonTeacher",
};

const getData = async (type) => await (await fetch(URL[type])).json();

const filterMap = {
  "name" : "Name",
  "rollNumber" : "Roll Number",
  "cgpa" : "CGPA",
  "email" : "Email",
  "address" : "Address",
  "placementRecord" : "Placement Record",
  "stream" : "Stream",
  "semester" : "Semester",
  "joinedAt" : "Joined At",
  "researchInterests" : "Research Interests",
  "subjectsAssigned" : "Subjects Assigned",
  "age" : "Age",
  "Actions" : "Actions",
  "responsibility" : "Responsibility"
}


const filterDataHeaders = (data) => {

  if(data.length === 0)
    return data;
  
  let keys = Object.keys(data[0]);
  let newMap = {};

  let dataArray = [];

  for(let i of data){
    for(let k of keys){
      newMap[filterMap[k]] = i[k];
    }

    dataArray.push(newMap);
  }

  console.log(dataArray);
  return dataArray;
}


const getTableRow = (dataChunk, idx) => {
  let fields = Object.keys(dataChunk);

  let tr = document.createElement("tr");

  for (let i of fields) {
    let td = document.createElement("td");
    if (typeof i != "object") {
      td.innerText = dataChunk[i];
    } else {
      td.innerText = dataChunk[i];
    }

    tr.appendChild(td);
  }

  let td = document.createElement("td");
  td.innerHTML = ` <button class='del-rec' onClick = "handleDelete(${idx})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg></button>

  <button class='update-rec' onClick = "handleUpdate(${idx})" data-bs-toggle="modal" data-bs-target="#updateModal">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
</button>
`;

  tr.appendChild(td);

  return tr;
};

const validateForm = () => {

}

const getTableHeader = (fields) => {
  let header = document.createElement("thead");
  let tr = document.createElement("tr");
  header.appendChild(tr);

  for (let i of fields) {
    let th = document.createElement("th");
    th.classList.add("table-primary");
    if (typeof i != "object") {
      th.innerText = filterMap[i];
    } else {
      th.innerText = filterMap[i];
    }

    tr.appendChild(th);
  }

  return header;
};

const populate = (data) => {
  contentPanel.innerHTML = "";
  if(data.length === 0){
    contentPanel.innerHTML = `<h1>No ${activeLink} Data Found</h1>`
    return;
  }


  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-secondary");
  table.classList.add("table-hover");
  table.classList.add("table-bordered");
  const fieldsArray = Object.keys(data[0]);
  fieldsArray.push("Actions");
  const tableHeader = getTableHeader(fieldsArray);
  table.appendChild(tableHeader);

  const tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  let cnt = 0;

  for (let i of data) {
    let tr = getTableRow(i, cnt);
    tableBody.appendChild(tr);
  }

  contentPanel.appendChild(table);
};


const handleDelete = async (idx) => {
  const targetRecord =
    activeLink === "student"
      ? JSON.parse(localStorage.getItem("data"))[idx].rollNumber
      : JSON.parse(localStorage.getItem("data"))[idx].email;

  if(activeLink === 'student'){
    let res = await deleteRecord('student',targetRecord);
    if(res.msg === 'Success'){
      let dataChunk = await getData("student");
      populate(dataChunk);
    }

    else
      alert(res.err)
  }

  if(activeLink === 'teacher'){
    let res = await deleteRecord('teacher',targetRecord);
    if(res.msg === 'Success'){
      let dataChunk = await getData("teacher");
      populate(dataChunk);
    }
    else
      alert(res.err)
  }

  if(activeLink === 'employee'){
    let res = await deleteRecord('employee',targetRecord);
    if(res.msg === 'Success'){
      let dataChunk = await getData("employee");
      populate(dataChunk);
    }
    else
      alert(res.err);
  }
};

const handleUpdate = (idx) => {
  let record = JSON.parse(localStorage.getItem('data'))[idx];
  createUpdateForm(record);
};

window.addEventListener("load", async () => {
  studentData = await getData("student");
  // studentData = filterDataHeaders(studentData);

  localStorage.setItem("data", JSON.stringify(studentData));
  populate(studentData);

  for (let i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener("click", async () => {
      let typeArray = ["student", "teacher", "employee"];

      for (let ii = 0; ii < navLink.length; ii++)
        navLink[ii].classList.remove("active");

      navLink[i].classList.add("active");
      let clickedType = typeArray[i];

      if (clickedType === activeLink) return null;

      let dataChunk;

      if (clickedType == "student") dataChunk = await getData("student");
      else if (clickedType == "teacher") dataChunk = await getData("teacher");
      else dataChunk = await getData("employee");

      // dataChunk = filterDataHeaders(dataChunk);
      console.log(dataChunk);
      localStorage.setItem("data", JSON.stringify(dataChunk));
      activeLink = clickedType;

      populate(dataChunk);

    });
  }

  updateFormSubmit.addEventListener('click',() => {
    validateForm(updateForm)
  })
});
