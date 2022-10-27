const handleUpdate = (idx) => {
    let record = JSON.parse(localStorage.getItem('data'))[idx];
    updateErrorField.innerText = '';

    buildForm(record);
}

const handleCreate = (type) => {
    buildForm();
}


const getData = async (type) => await (await fetch(URL[type])).json();

const updateData = async (type,data) => {
    const link = URL[type];
    let returnObj = {};

    try{
        let res = await fetch(link,{
            'method' : "PATCH",
            'headers' : {
                'Content-Type' : 'application/json'
            },
            'body' : JSON.stringify(data)
        });

        res = await res.json();

        return res;
    } 
    catch(error){
        returnObj = {
            "msg" : "failure",
            "error" : error
        }
    }

    return returnObj;
}   


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


const postData = async(type,data) => {
    const link = URL[type];
    let returnObj = {};

    try{
        let res = await fetch(link,{
            'method' : "POST",
            'headers' : {
                'Content-Type' : 'application/json'
            },
            'body' : JSON.stringify(data)
        });

        res = await res.json();

        return res;
    } 
    catch(error){
        returnObj = {
            "msg" : "failure",
            "error" : error
        }
    }

    return returnObj;

}