import { Router } from "express";
import {
  createSkill,
  getSkills,
  addUserSkill,
  removeUserSkill,
  getLearningResources,
  getCareerPaths,
  getCareerPathSkills,
} from "../controllers/skill.controller.js";

const router = Router();

router.post("/", createSkill);
router.get("/", getSkills);
router.post("/user/add", addUserSkill);
router.post("/user/remove", removeUserSkill);
router.get("/resources", getLearningResources);
router.get("/career-paths", getCareerPaths);
router.get("/career-path-skills", getCareerPathSkills);

export default router;
