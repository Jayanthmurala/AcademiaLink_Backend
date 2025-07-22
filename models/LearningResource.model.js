import mongoose from "mongoose";

const learningResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    type: { type: String }, // e.g., video, article, course
    skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
    source: { type: String }, // e.g., Gemini, manual
  },
  { timestamps: true }
);

const LearningResource = mongoose.model(
  "LearningResource",
  learningResourceSchema
);

export default LearningResource;
