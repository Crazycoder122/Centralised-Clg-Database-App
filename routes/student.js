import express from "express";
import {
    getStudents,
    createStudent,
    deleteStudent,
    updateStudent
} from "../helpers/student.js";

const Router = express.Router();

Router.get("/", getStudents)
  .post("/", createStudent)
  .delete("/", deleteStudent)
  .patch("/", updateStudent);

export default Router;
