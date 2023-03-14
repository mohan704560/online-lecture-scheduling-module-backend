import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail:{
    data:Buffer,
    contentType: String,
  },
},{
    timestamps: true,
});

export default mongoose.model('course',courseSchema);

