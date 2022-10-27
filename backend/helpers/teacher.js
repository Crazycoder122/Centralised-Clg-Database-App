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
const teacherRef = collection(db, "Teacher");

export const getTeachers = async (req, res) => {
  const docsCollection = await getDocs(teacherRef);

  const teacherArray = [];

  docsCollection.forEach((d) => {
    teacherArray.push(d.data());
  });

  res.send(teacherArray);
};

export const createTeacher = async (req, res) => {
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

  const q = await getDocs(query(teacherRef, where("Email", "==", Email)));

  if (!q.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Teacher with same Email Exists",
    };

    res.status(409);
  } else {
    const doc_ref = await addDoc(teacherRef, newObj);

    returnMsg = {
      msg: "Success",
      id: doc_ref.id,
    };

    res.status(200);
  }

  res.send(returnMsg);
};

export const deleteTeacher = async (req, res) => {
  let Email = req.body.Email;

  let returnMsg = {};

  let q = await getDocs(
    query(teacherRef, where("Email", "==", Email), limit(1))
  );

  if (q.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Teacher with Email does not exist",
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

export const updateTeacher = async (req, res) => {
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

  const q = await getDocs(
    query(teacherRef, where("Email", "==", Email), limit(1))
  );

  if (q.empty) {
    returnMsg = {
      msg: "Failure",
      err: "Teacher with Email does not exist",
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
