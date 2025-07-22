import { Router } from "express";
import uploadImages from "../controllers/image.controller.js";
import upload from "../middelware/multer.middleware.js";

const imageRutes = Router();

imageRutes.post("/upload", upload.single("image"), uploadImages);

export default imageRutes;
