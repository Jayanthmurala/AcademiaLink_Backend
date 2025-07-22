import mongoose from "mongoose";

const careerPathSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    requiredSkills: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const CareerPath = mongoose.model("CareerPath", careerPathSchema);

export default CareerPath;
