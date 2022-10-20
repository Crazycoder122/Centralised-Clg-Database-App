import express from "express";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee
} from "../helpers/nonTeacher.js";

const Router = express.Router();

Router.get("/", getEmployees)
  .post("/", createEmployee)
  .delete("/", deleteEmployee)
  .patch("/", updateEmployee);

export default Router;
