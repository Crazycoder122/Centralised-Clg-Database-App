import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  name : String,
  code : String,
  is_practical : Boolean,
  semester : Number
});

export default mongoose.model("Subject Model", subjectSchema);
