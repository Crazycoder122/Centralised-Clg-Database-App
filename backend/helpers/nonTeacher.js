import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const employeeDB = path.join(__dirname, "../Databases/employee.json");

const checkIfNoMidification = (obj, objArray) => {
  for (let i of objArray) {
    if (JSON.stringify(obj) === JSON.stringify(i)) return true;
  }

  return false;
};

export const getEmployees = (req, res) => {
  const fileContent = JSON.parse(fs.readFileSync(employeeDB, "utf-8"));

  console.log(fileContent);
  res.status(200);
  res.send(fileContent);
};

export const createEmployee = (req, res) => {
  let content = req.body;

  let name = content.name;
  let age = content.age;
  let email = content.email;
  let joinedAt = content.joinedAt;
  let responsibility = content.responsibility;

  let newObj = { name, age, email, joinedAt, responsibility };

  let returnMsg = null;

  const fileContent = JSON.parse(fs.readFileSync(employeeDB, "utf-8"));

  for (let i of fileContent) {
    if (i.email === newObj.email) {
      returnMsg = {
        msg: "Failure",
        error: "Employee with the same Email exists",
      };

      res.status(409);
    }
  }

  if (returnMsg == null) {
    fileContent.push(newObj);
    fs.writeFileSync(employeeDB, JSON.stringify(fileContent));

    returnMsg = {
      msg: "Successs",
    };

    res.status(200);
  }

  res.send(returnMsg);
};

export const deleteEmployee = (req, res) => {
  const email = req.body.email;

  let fileContent = JSON.parse(fs.readFileSync(employeeDB, "utf-8"));

  let new_JSON_Array = [];
  let returnMsg = null;

  for (let i of fileContent) {
    if (i.email == email) {
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
      error: "Employee with Given Email Address does not exist",
    };

    res.status(404);
  }
  fs.writeFileSync(employeeDB, JSON.stringify(new_JSON_Array));

  res.send(returnMsg);
};

export const updateEmployee = (req, res) => {
  let content = req.body;

  let name = content.name;
  let age = content.age;
  let email = content.email;
  let joinedAt = content.joinedAt;
  let responsibility = content.responsibility;

  let newObj = { name, age, email, joinedAt, responsibility };

  let returnMsg = null;
  let new_JSON_Array = [];

  const fileContent = JSON.parse(fs.readFileSync(employeeDB, "utf-8"));

  if (checkIfNoMidification(newObj, fileContent)) {
    returnMsg = {
      msg: "Failure",
      error: "No Modification to the original record",
    };

    res.status(409);
  }

  if (returnMsg == null) {
    for (let i of fileContent) {
      if (i.email === email) {
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

    if (returnMsg == null) {
      returnMsg = {
        msg: "Failure",
        error: "Employee with the Given Email Address not found",
      };

      res.status(404);
    }

    fs.writeFileSync(employeeDB, JSON.stringify(new_JSON_Array));
  }

  res.send(returnMsg);

};