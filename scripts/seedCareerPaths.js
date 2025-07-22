import mongoose from "mongoose";
import dotenv from "dotenv";
import CareerPath from "../models/CareerPath.model.js";
import dbConnection from "../db/dbconnection/db.connection.js";

dotenv.config();

dbConnection();

const paths = [
  {
    name: "Full Stack Developer",
    requiredSkills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Git",
    ],
  },
  {
    name: "Data Scientist",
    requiredSkills: [
      "Python",
      "Pandas",
      "NumPy",
      "Machine Learning",
      "Statistics",
      "Data Visualization",
      "SQL",
      "TensorFlow",
    ],
  },
  {
    name: "Machine Learning Engineer",
    requiredSkills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "Data Preprocessing",
      "Model Deployment",
    ],
  },
  {
    name: "DevOps Engineer",
    requiredSkills: [
      "Linux",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "AWS",
      "Terraform",
      "Scripting",
      "Monitoring",
    ],
  },
  {
    name: "Mobile App Developer",
    requiredSkills: [
      "Java",
      "Kotlin",
      "Swift",
      "React Native",
      "Flutter",
      "Mobile UI/UX",
      "APIs",
    ],
  },
  {
    name: "Cybersecurity Specialist",
    requiredSkills: [
      "Networking",
      "Linux",
      "Security Analysis",
      "Penetration Testing",
      "Firewalls",
      "Cryptography",
      "Incident Response",
    ],
  },
  {
    name: "Cloud Architect",
    requiredSkills: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Cloud Security",
      "Networking",
      "DevOps",
      "Containers",
    ],
  },
  {
    name: "Product Manager",
    requiredSkills: [
      "Product Strategy",
      "Market Research",
      "Agile",
      "Roadmapping",
      "User Experience",
      "Analytics",
      "Communication",
    ],
  },
];

async function seed() {
  await CareerPath.deleteMany({});
  await CareerPath.insertMany(paths);
  console.log("Career paths seeded!");
  mongoose.connection.close();
}

seed();
