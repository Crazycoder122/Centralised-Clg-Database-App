const getTableHeader = (fields) => {
  let header = document.createElement("thead");
  let tr = document.createElement("tr");
  header.appendChild(tr);

  for (let i of fields) {
    let th = document.createElement("th");
    th.classList.add("table-primary");
    if (typeof i != "object") {
      th.innerText = i;
    } else {
      th.innerText = i;
    }

    tr.appendChild(th);
  }

  return header;
};

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

const getProperOrientedObject = (o) => {
  let keys = Object.keys(o);
  keys.sort();

  console.log(keys);
  let ans = {};

  for(let i of keys){
    ans[i] = o[i];
  }

  return ans;
}


const populate = (data) => {
  contentPanel.innerHTML = "";
  if (data.length === 0) {
    contentPanel.innerHTML = `<h1>No ${activeLink} Data Found</h1>`;

    let createBtn = document.createElement('button');
    createBtn.innerText = `Create ${activeLink} Record`;
    createBtn.classList.add('btn');
    createBtn.classList.add('btn-warning');
    createBtn.setAttribute('onclick',`handleCreate("${activeLink}")`);
    createBtn.setAttribute('data-bs-toggle','modal');
    createBtn.setAttribute('data-bs-target','#createModal');
    contentPanel.appendChild(createBtn);

    console.log("Here-2");
    return;
  }

  let h2 = document.createElement('h2');
  h2.innerHTML = `${activeLink} Database`;
  contentPanel.appendChild(h2);

  let createBtn = document.createElement('button');
  createBtn.innerText = `Create ${activeLink} Record`;
  createBtn.classList.add('btn');
  createBtn.classList.add('btn-warning');
  createBtn.setAttribute('onclick',`handleCreate("${activeLink}")`);
  createBtn.setAttribute('data-bs-toggle','modal');
  createBtn.setAttribute('data-bs-target','#createModal');
  contentPanel.appendChild(createBtn);

  const table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-secondary");
  table.classList.add("table-hover");
  table.classList.add("table-bordered");
  const fieldsArray = Object.keys(getProperOrientedObject(data[0]));
  fieldsArray.push("Actions");
  const tableHeader = getTableHeader(fieldsArray);
  table.appendChild(tableHeader);

  const tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  let cnt = 0;

  for (let i of data) {
    i = getProperOrientedObject(i)
    let tr = getTableRow(i, cnt);
    tableBody.appendChild(tr);
    cnt+=1;
  }

  contentPanel.appendChild(table);
};

const getAppropriateInputName = (name) => name.split(' ').join('_');

const getAppropriateInput = (config,isUpdate) => {
    const ip = document.createElement('input');
    ip.setAttribute('placeholder',config["placeholder"]);
    config["required"] ? ip.setAttribute('required',true) : null;
    config["pattern"] ? ip.setAttribute("pattern",config["pattern"]) : null;
    ip.setAttribute("name",getAppropriateInputName(config["label"]));

    let fn_string = isUpdate ? "checkUpdateFormElementValidity(this)" : "checkCreateFormElementValidity(this)";

    ip.setAttribute('oninput',fn_string);

    if(config["label"] === 'Email' || config["label"] === 'Roll Number')
        ip.setAttribute('disabled',true);

    if(config["type"] === "datalist"){
        ip.setAttribute('list',`${config["label"]}`);

        let datalist = document.createElement('datalist');
        datalist.id = config["label"];

        for (let i of config["options"]){
            let option = document.createElement('option');
            option.value = i;
            datalist.appendChild(option);
        }

        ip.appendChild(datalist)
    }

    else
        ip.setAttribute('type', config["type"]);

    return ip;
};

const buildForm = (data) => {
    data ? updateForm.innerHTML = '' : createForm.innerHTML = '';

  const formConfig =
    activeLink === "student"
      ? studentForm
      : activeLink === "teacher"
      ? teacherForm
      : employeeForm;

  for (let i of formConfig) {
    const div = document.createElement('div');
    div.classList.add('form-ip-div')
    const label = document.createElement("label");
    label.innerText = i["label"]+ ':';

    const ip = getAppropriateInput(i,data);
    data ? null : ip.removeAttribute('disabled');
    data ? ip.value = data[getAppropriateInputName(i["label"])] : null;

    div.appendChild(label);
    div.appendChild(ip);
    data ? updateForm.appendChild(div) : createForm.appendChild(div);
  }
};
