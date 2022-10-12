import mongoose from "mongoose";

const nonTeacherSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password : String,
  joining_date : Date,
  responsibility : [String]
});

export default mongoose.model("Non-Teacher Model", nonTeacherSchema);
