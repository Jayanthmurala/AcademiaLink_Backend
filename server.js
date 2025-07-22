import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/dbconnection/db.connection.js";
import userRutes from "./routes/user.route.js";
import cors from "cors";
import imageRutes from "./routes/imageUpload.route.js";
import skillRoutes from "./routes/skill.route.js";
import learningResourceRoutes from "./routes/learningResource.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Server is running🛡️" });
});

// Routes
app.use("/api/v1/", userRutes);
app.use("/api/v1/image", imageRutes);
app.use("/api/skills", skillRoutes);
app.use("/api/learning-resources", learningResourceRoutes);

dbConnection();
app.listen(PORT, () => {
  console.log(`server is runing on http://localhost:${PORT}`);
});
