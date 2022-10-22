import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teacherDB = path.join(__dirname, "../Databases/teacher.json");

const checkIfNoMidification = (obj, objArray) => {
  for (let i of objArray) {
    if (JSON.stringify(obj) === JSON.stringify(i)) return true;
  }

  return false;
};


export const getTeachers = (req, res) => {
  const fileContent = JSON.parse(fs.readFileSync(teacherDB, "utf-8"));

  console.log(fileContent);
  res.status(200);
  res.send(fileContent);
};

export const createTeacher = (req, res) => {
  let content = req.body;

  let Name = content.Name;
  let Email = content.Email;
  let Age = content.Age;
  let Joined_At = content.Joined_At;
  let Research_Interests = content.Research_Interests;
  let Subjects_Assigned = content.Subjects_Assigned;

  let newObj = {
    Name,
    Email,
    Age,
    Joined_At,
    Research_Interests,
    Subjects_Assigned,
  };

  let returnMsg = null;

  const fileContent = JSON.parse(fs.readFileSync(teacherDB, "utf-8"));

  for (let i of fileContent) {
    if (i.Email === newObj.Email) {
      returnMsg = {
        msg: "Failure",
        error: "Teacher with the same Email exists",
      };

      res.status(409);
    }
  }

  if (returnMsg == null) {
    fileContent.push(newObj);
    fs.writeFileSync(teacherDB, JSON.stringify(fileContent));

    returnMsg = {
      msg: "Successs",
    };

    res.status(200);
  }

  res.send(returnMsg);
};

export const deleteTeacher = (req, res) => {
  const email = req.body.Email;

  let fileContent = JSON.parse(fs.readFileSync(teacherDB, "utf-8"));

  let new_JSON_Array = [];
  let returnMsg = null;

  for (let i of fileContent) {
    if (i.Email === email) {
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
      error: "Teacher with Given Email Address does not exist",
    };

    res.status(404);
  }
  fs.writeFileSync(teacherDB, JSON.stringify(new_JSON_Array));

  res.send(returnMsg);
};

export const updateTeacher = (req, res) => {
  let content = req.body;

  let Name = content.Name;
  let Email = content.Email;
  let Age = content.Age;
  let Joined_At = content.Joined_At;
  let Research_Interests = content.Research_Interests;
  let Subjects_Assigned = content.Subjects_Assigned;

  let newObj = {
    Name,
    Email,
    Age,
    Joined_At,
    Research_Interests,
    Subjects_Assigned
  };

  let returnMsg = null;
  let new_JSON_Array = [];

  const fileContent = JSON.parse(fs.readFileSync(teacherDB, "utf-8"));
  if (checkIfNoMidification(newObj, fileContent)) {

    returnMsg = {
      msg: "Failure",
      error: "No Modification to the original record",
    };

    res.status(409);
  }

  if (returnMsg == null) {
    for (let i of fileContent) {
      if (i.Email === Email) {
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
        error: "Teacher with the Given Email Address not found",
      };

      res.status(404);
    }

    fs.writeFileSync(teacherDB, JSON.stringify(new_JSON_Array));
  }

  res.send(returnMsg);

};
