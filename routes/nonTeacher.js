import express from "express";
import {} from "../helpers/nonTeacher.js";

const Router = express.Router();

Router.get("/", getEmployees)
  .post("/", createEmployee)
  .delete("/", deleteEmployee)
  .patch("/", updateEmployee);

export default Router;
