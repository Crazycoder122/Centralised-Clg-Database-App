import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  name : String,
  code : String,
  is_practical : Boolean,
  is_compulsory : Boolean,
  semester : Number,
});

export default mongoose.model("Subject Model", subjectSchema);
