import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  limit,
  setDoc,
} from "firebase/firestore";

import { checkIfNoMidification } from "./utils.js";

const db = getFirestore();
const EmployeeRef = collection(db, "Employee");

export const getEmployees = async (req, res) => {
  const docsCollection = await getDocs(EmployeeRef);

  const EmployeeArray = [];

  docsCollection.forEach((d) => {
    EmployeeArray.push(d.data());
  });

  res.send(EmployeeArray);
};

export const createEmployee = async (req, res) => {
  let content = req.body;

  let Name = content.Name;
  let Age = content.Age;
  let Email = content.Email;
  let Joined_At = content.Joined_At;
  let Responsibility = content.Responsibility;

  let newObj = { Name, Age, Email, Joined_At, Responsibility };
  console.log(newObj);
  let returnMsg = null;

  console.log("Hello");

  const q = await getDocs(query(EmployeeRef, where("Email", "==", Email)));

  if (!q.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Employee with same Email Exists",
    };

    res.status(409);
  } else {
    const doc_ref = await addDoc(EmployeeRef, newObj);

    returnMsg = {
      msg: "Success",
      id: doc_ref.id,
    };

    res.status(200);
  }

  res.send(returnMsg);
};

export const deleteEmployee = async (req, res) => {
  let Email = req.body.Email;

  let returnMsg = {};

  let q = await getDocs(
    query(EmployeeRef, where("Email", "==", Email), limit(1))
  );

  if (q.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Employee with Email does not exist",
    };

    res.status(404);
  } else {
    q.forEach(async (d) => {
      await deleteDoc(d.ref);
    });

    returnMsg = {
      msg: "Success",
    };

    res.status(200);
  }
  res.send(returnMsg);
};

export const updateEmployee = async (req, res) => {
  let content = req.body;

  let Name = content.Name;
  let Age = content.Age;
  let Email = content.Email;
  let Joined_At = content.Joined_At;
  let Responsibility = content.Responsibility;

  let newObj = { Name, Age, Email, Joined_At, Responsibility };
  let returnMsg = null;

  const q = await getDocs(
    query(EmployeeRef, where("Email", "==", Email), limit(1))
  );

  if (q.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Employee with Email does not exist",
    };

    res.status(404);
  } else {
    let dataObtained = q.docs.map((d) => d.data())[0];

    console.log(
      checkIfNoMidification(newObj, dataObtained),
      newObj,
      dataObtained
    );
    if (checkIfNoMidification(newObj, dataObtained)) {
      returnMsg = {
        msg: "Failure",
        err: "No Modification to original Record",
      };

      res.status(409);
    } else {
      q.forEach(async (d) => {
        await setDoc(d.ref, newObj);
      });

      returnMsg = {
        msg: "Success",
      };

      res.status(200);
    }
  }

  res.send(returnMsg);
};
