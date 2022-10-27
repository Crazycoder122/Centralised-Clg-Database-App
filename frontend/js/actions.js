const deleteRecord = async (type,Param) => {

    console.log(Param);
    const url = URL[type];

    let returnObj = {};

    let reqBody = {};

    if(type === 'student')
        reqBody["roll"] = (Param);

    else
        reqBody["email"] = Param;
    
    try {
        let res = await fetch(url,{
            'method' : "DELETE",
            'headers' : {
                'Content-Type' : 'application/json'
            },
            'body' : JSON.stringify(reqBody)
        });

        res = await res.json();

        console.log(res,' is res ');
        return res;
    } catch (error) {
        returnObj = {
            status : false,
            err : error
        }
    }
}   


const updateRecord = async(type,Param) => {

}


const createUpdateForm = (data) => {
    let keys = Object.keys(data);

    updateForm.innerHTML = '';
    for(let i of keys){

        let formField = document.createElement('input');;
        let label = document.createElement('label');
        label.classList.add('form-label')
        let div = document.createElement('div');
        div.classList.add("form-field-div");

        div.appendChild(label);
        div.appendChild(formField);
        label.innerText = filterMap[i]+':';
        formField.value = data[i];

        if(typeof(data[i]) === 'string')
            formField.setAttribute('type','text');
        
        if(i === 'email' || i === 'rollNumber')
            formField.setAttribute('disabled',true)
        updateForm.appendChild(div)
    }
}