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
const studentRef = collection(db, "Student");

export const getStudents = async (req, res) => {
  const docsCollection = await getDocs(studentRef);

  const studentArray = [];

  docsCollection.forEach((d) => {
    studentArray.push(d.data());
  });

  res.send(studentArray);
};

export const createStudent = async (req, res) => {
  const content = req.body;

  let Name = content.Name;
  let Roll_Number = content.Roll_Number;
  let CGPA = content.CGPA;
  let Email = content.Email;
  let Address = content.Address;
  let Placement_Record = content.Placement_Record || null;
  let Stream = content.Stream;
  let Semester = content.Semester;

  let newObj = {
    Name,
    Roll_Number,
    CGPA,
    Email,
    Address,
    Placement_Record,
    Stream,
    Semester,
  };

  let returnMsg = null;

  const q1 = await getDocs(query(studentRef, where("Email", "==", Email)));
  const q2 = await getDocs(
    query(studentRef, where("Roll_Number", "==", Roll_Number))
  );

  if (!q1.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Student with same Email Exists",
    };

    res.status(409);
  } else if (!q2.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Student with same Roll Number Exists",
    };

    res.status(409);
  } else {
    const doc_ref = await addDoc(studentRef, newObj);

    returnMsg = {
      msg: "Success",
      id: doc_ref.id,
    };

    res.status(200);
  }

  res.send(returnMsg);
};

export const deleteStudent = async (req, res) => {
  let Roll_Number = req.body.Roll_Number;

  let returnMsg = {};

  let q = await getDocs(
    query(studentRef, where("Roll_Number", "==", Roll_Number), limit(1))
  );

  if (q.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Student with Roll Number does not exist",
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

  console.log("Here");
  res.send(returnMsg);
};

export const updateStudent = async (req, res) => {
  const content = req.body;

  let Name = content.Name;
  let Roll_Number = content.Roll_Number;
  let CGPA = content.CGPA;
  let Email = content.Email;
  let Address = content.Address;
  let Placement_Record = content.Placement_Record || null;
  let Stream = content.Stream;
  let Semester = content.Semester;

  let returnMsg = null;

  let newObj = {
    Name,
    Roll_Number,
    CGPA,
    Email,
    Address,
    Placement_Record,
    Stream,
    Semester,
  };

  const q = await getDocs(
    query(studentRef, where("Roll_Number", "==", Roll_Number), limit(1))
  );

  if (q.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Student with Roll Number does not exist",
    };

    res.status(404);
  } else {
    let dataObtained = q.docs.map((d) => d.data())[0];

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
