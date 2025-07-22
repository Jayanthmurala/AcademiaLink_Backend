import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },
    collegeId: {
      type: String,
      required: true,
      unique: true,
    },
    collegeName: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    contactInfo: {
      type: String,
    },
    year: {
      type: Number,
    },
    skills: {
      type: [String],
    },
    interests: {
      type: String,
    },
    department: {
      type: String,
    },
    researchInterests: {
      type: String,
    },
    areasOfExpertise: {
      type: [String],
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    resume: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    avatar: {
      type: String,
    },
    personalProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalProject",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    publications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    savedLearningResources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LearningResource",
      },
    ],
    selectedCareerPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerPath",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
