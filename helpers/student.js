import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studentDB = path.join(__dirname,'../res/student.json');


const checkIfNoMidification = (obj,objArray) => {
  for(let i of objArray){
    if(JSON.stringify(obj) === JSON.stringify(i))
      return true;
  }

  return false;
}


export const getStudents = (req, res) => {
  const fileContent = JSON.parse(
    fs.readFileSync(studentDB, "utf-8")
  );

  console.log(fileContent);
  res.status(200);
  res.send(fileContent);
};

export const createStudent = (req, res) => {
  const content = req.body;

  let name = content.name;
  let rollNumber = content.roll;
  let cgpa = content.cgpa;
  let email = content.email;
  let address = content.email;
  let placementRecord = content.placement;
  let newObj = { name, rollNumber, cgpa, email, address,placementRecord};

  console.log(newObj)
  let returnMsg = null;

  const fileContent = JSON.parse(
    fs.readFileSync(studentDB, "utf-8")
  );

  for (let i of fileContent) {
    if (i.rollNumber === newObj.rollNumber || i.email == newObj.email) {
      returnMsg = {
        msg: "Failure",
        error: "Student with the same Roll Number/Email exists",
      };

      res.status(409);
    }
  }

  if (returnMsg == null) {
    fileContent.push(newObj);
    fs.writeFileSync(studentDB,JSON.stringify(fileContent));

    returnMsg = {
      msg: "Successs",
    };

    res.status(200);
  }

  res.send(returnMsg);
};

export const deleteStudent = (req, res) => {
  const roll = req.body.roll;

  let fileContent = JSON.parse(fs.readFileSync(studentDB, "utf-8"));

  let new_JSON_Array = [];
  let returnMsg = null;

  for (let i of fileContent) {
    if (i.rollNumber == roll) {
      returnMsg = {
        msg: "Success",
      };
      res.status(200);
      continue;
    }

    new_JSON_Array.push(i);
  }

  if (returnMsg == null) {
    returnMsg = {
      msg: "Failure",
      error: "Student with Given Roll Number does not exist",
    };

    res.status(404);
  }

  fs.writeFileSync(studentDB,JSON.stringify(new_JSON_Array));

  res.send(returnMsg);
};

export const updateStudent = (req, res) => {
  const content = req.body;

  let name = content.name;
  let rollNumber = content.roll;
  let cgpa = content.cgpa;
  let email = content.email;
  let address = content.address;
  let placementRecord = content.placement;
  let newObj = { name, rollNumber, cgpa, email, address,placementRecord};

  
  let new_JSON_Array = [];

  let returnMsg = null;

  const fileContent = JSON.parse(
    fs.readFileSync(studentDB, "utf-8")
  );

  if (checkIfNoMidification(newObj,fileContent)) {
    returnMsg = {
      msg: "Failure",
      error: "No Modification to the original record",
    };

    res.status(409);
  }

  if (returnMsg == null) {
    for (let i of fileContent) {
      if (i.rollNumber == rollNumber) {
        returnMsg = {
          msg: "Success",
        };
        res.status(200);
        new_JSON_Array.push(newObj);
        console.log(new_JSON_Array[new_JSON_Array.length - 1]);
        continue;
      }

      new_JSON_Array.push(i);
    }
  }

  if (returnMsg == null) {
    returnMsg = {
      msg: "Failure",
      error: "Student with the Given Roll Number not found",
    };

    res.status(404);
  }

  fs.writeFileSync(studentDB,JSON.stringify(new_JSON_Array));

  res.send(returnMsg);
};
