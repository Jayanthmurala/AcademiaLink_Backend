import { Router } from "express";
import userController from "../controllers/user.controller.js";
import userMiddelware from "../middelware/user.middleware.js";
import {
  setSelectedCareerPath,
  getSelectedCareerPath,
  getResourcesForSelectedCareerPath,
  saveLearningResourceToUser,
  getUserSavedLearningResources,
} from "../controllers/user.controller.js";

const userRutes = Router();

userRutes.post("/register", userController.userRegister);
userRutes.post("/login", userController.userLogin);
userRutes.get("/profile", userMiddelware, userController.getProfile);
userRutes.put("/student/profile", userMiddelware, userController.updateUser);
userRutes.put("/avatar", userMiddelware, userController.uploadAvatar);
userRutes.post(
  "/student/add-project",
  userMiddelware,
  userController.addStudentProject
);
userRutes.get(
  "/student/projects",
  userMiddelware,
  userController.getStudentProjects
);
userRutes.delete(
  "/student/project/:projectId",
  userMiddelware,
  userController.deleteStudentProject
);
userRutes.post(
  "/student/selected-career-path",
  userMiddelware,
  setSelectedCareerPath
);
userRutes.get(
  "/student/selected-career-path",
  userMiddelware,
  getSelectedCareerPath
);
userRutes.get(
  "/student/selected-career-path/resources",
  userMiddelware,
  getResourcesForSelectedCareerPath
);
userRutes.post(
  "/student/save-learning-resource",
  userMiddelware,
  saveLearningResourceToUser
);
userRutes.get(
  "/student/saved-learning-resources",
  userMiddelware,
  getUserSavedLearningResources
);
export default userRutes;
