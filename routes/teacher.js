import express from "express";
import {} from "../helpers/teacher.js";

const Router = express.Router();

Router.get("/", getTeachers)
  .post("/", createTeacher)
  .delete("/", deleteTeacher)
  .patch("/", updateTeacher);

export default Router;
