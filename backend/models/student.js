import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password : String,
  makaut_roll: String,
  admission_year: Number,
  semester: Number,
  SGPA: Number,
  subjects_completed: [String],
  backlog: [String],
  moocs_point: Number,
  mar_point: Number,
  is_lateral: Boolean,
});

export default mongoose.model("Student Model", studentSchema);
