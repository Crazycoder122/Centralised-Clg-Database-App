const contentPanel = document.getElementById("content-panel");
const navLink = document.getElementsByClassName("nav-link");

const updateFormSubmit = document.getElementById('update-submit');
const updateForm = document.getElementById('update-form');
const updateFormLoading = document.getElementById('update-loading');
const updateErrorField = document.getElementById('update-error');

const updateModalcontainer = document.getElementById('updateModal');
let updateModal = new bootstrap.Modal(updateModalcontainer); 


const createFormSubmit = document.getElementById('create-submit');
const createForm = document.getElementById('create-form');
const createFormLoading = document.getElementById('create-loading');
const createErrorField = document.getElementById('create-error');

const createModalcontainer = document.getElementById('createModal');
let createModal = new bootstrap.Modal(createModalcontainer); 


const notificationToastContainer = document.getElementById('notificationToast');
const notificationToast = new bootstrap.Toast(notificationToastContainer);
const toastBody = document.getElementsByClassName('toast-body')[0]

let activeLink = "student";
let isUpdateFormCorrect = false;

let studentData = [];
let teacherData = [];
let employeeData = [];


const isValidForm = (form) => {
  const ips = form.getElementsByTagName('input');

  console.log();
  for(let i of ips){
    if(i.checkValidity() === false)
      return false;
  }

  return true;
}

const checkCreateFormElementValidity = (elem) => {

  if(!isValidForm(createForm))
      createFormSubmit.setAttribute('disabled',true)
  else
    createFormSubmit.removeAttribute('disabled');
}


const checkUpdateFormElementValidity = (elem) => {

    if(!elem.checkValidity())
        updateFormSubmit.setAttribute('disabled',true)
    else
        updateFormSubmit.removeAttribute('disabled');
}


const getCorrectInputValue = (inputElem,formConfig) => {
  let formInput = inputElem.value;
  let correctIp = formConfig.find(o => getAppropriateInputName(o["label"]) === inputElem.name);
  
  if(correctIp["API Type"] === "text")
    return formInput;
  
  if(correctIp["API Type"] === 'number')
    return parseInt(formInput);

  if(correctIp["API Type"] === 'float')
    return parseFloat(formInput);

  if(correctIp["API Type"] === 'array'){
    if(formInput === '')
      return [];
    
    return formInput.split(',');
  }
}


(async () => {

    // Getting the Student Data and storing it in LocalStorage
    studentData = await getData("student");
    localStorage.setItem("data", JSON.stringify(studentData));

    // Populate the whole screen with the Student Data
    populate(studentData);  
    
    console.log(studentData);
    // Adding an Event Listener for all the NavLinks
    for (let i = 0; i < navLink.length; i++) {

      navLink[i].addEventListener("click", async () => {

        // Array of Types of Entities
        let typeArray = ["student", "teacher", "employee"];

        // Removing the "active" class from all the Navlinks
        for (let ii = 0; ii < navLink.length; ii++)
          navLink[ii].classList.remove("active");
        
        // Now adding the "active" class for the Target Navlink
        navLink[i].classList.add("active");

        // Getting the Type of Entity the Target Navlink Points to and then fetching that Data and storing it in LocalStorage
        let clickedType = typeArray[i];
        let dataChunk = await getData(clickedType);
        localStorage.setItem("data", JSON.stringify(dataChunk));

        // Changing the Global State of Active link
        activeLink = clickedType;
        
        // Populate the Page with the Data Obtained
        populate(dataChunk);
  
      });
    }
    
    updateFormSubmit.addEventListener('click',async () => {
      updateFormLoading.style.display = ''
        const ips = updateForm.getElementsByTagName('input');

        let payload = {};
      
        const formConfig =
        activeLink === "student"
          ? studentForm
          : activeLink === "teacher"
          ? teacherForm
          : employeeForm;
        
        for(let i of ips)
          payload[i.name] = getCorrectInputValue(i,formConfig);
        
      const res = await updateData(activeLink,payload);

      updateFormLoading.style.display = 'none'

      if(res.msg === 'Success'){

        updateModal.hide();
        document.getElementsByClassName('modal-backdrop')[0].remove();


        let dataChunk = await getData(activeLink);
        localStorage.setItem("data", JSON.stringify(dataChunk));
        
        populate(dataChunk);

        // toastBody.innerHTML = `Successfully Updated the ${activeLink}`;
        // notificationToast.show();
      }

      else{
        console.log(res);
        updateErrorField.innerText = res.err;
      }

    });

    createFormSubmit.addEventListener('click',async () => {
      createFormLoading.style.display = '';

      const ips = createForm.getElementsByTagName('input');

      let payload = {};
      
      const formConfig =
      activeLink === "student"
        ? studentForm
        : activeLink === "teacher"
        ? teacherForm
        : employeeForm;
      
      for(let i of ips)
        payload[i.name] = getCorrectInputValue(i,formConfig);
      
    const res = await postData(activeLink,payload);

    createFormLoading.style.display = 'none'

    console.log(res);

    if(res.msg === 'Success'){

      createModal.hide();
      document.getElementsByClassName('modal-backdrop')[0].remove();


      let dataChunk = await getData(activeLink);
      localStorage.setItem("data", JSON.stringify(dataChunk));
      
      populate(dataChunk);

      // toastBody.innerHTML = `Successfully Updated the ${activeLink}`;
      // notificationToast.show();
    }

    else{
      console.log(res);
      createErrorField.innerText = res.err;
    }

    })
})();
