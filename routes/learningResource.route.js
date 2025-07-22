import express from "express";
import {
  getAllLearningResources,
  getLearningResourceById,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
} from "../controllers/learningResource.controller.js";

const router = express.Router();

router.get("/", getAllLearningResources);
router.get("/:id", getLearningResourceById);
router.post("/", createLearningResource);
router.put("/:id", updateLearningResource);
router.delete("/:id", deleteLearningResource);

export default router;
