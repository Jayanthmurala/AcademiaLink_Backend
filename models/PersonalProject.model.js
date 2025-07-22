import mongoose from "mongoose";
const PersonalProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
    },
    demoLink: {
      type: String,
    },
    image: {
      type: String,
      default:
        " https://ik.imagekit.io/jayanthmurala05/fahim-muntashir-aCeVa_v7OYg-unsplash.jpg?updatedAt=1753099545037",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const PersonalProject = mongoose.model(
  "PersonalProject",
  PersonalProjectSchema
);

export default PersonalProject;
