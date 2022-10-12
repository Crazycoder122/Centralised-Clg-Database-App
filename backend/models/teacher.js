import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  name : String,
  age : Number,
  email : String,
  password : String,
  date_of_joining : Date,
  research_interests : [String],
  specialised_subjects : [String],
  subjects_assigned : [String],
  is_sys_admin : Boolean
});

export default mongoose.model("Teacher Model", teacherSchema);
