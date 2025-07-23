import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import PersonalProject from "../models/PersonalProject.model.js";
import LearningResource from "../models/LearningResource.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

//Register User
const userRegister = async (req, res) => {
  const { name, email, password, collegeId, department, year } = req.body;
  // console.log(name, email, password, collegeId, department, year);
  try {
    const user = await User.findOne({ email });
    const college = await User.findOne({ collegeId });
    if (user || college) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      collegeId,
      department,
      year,
      collegeName: "Vishnu Institute of Technology(A)",
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Login User
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ data: user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update user or profile
const updateUser = async (req, res) => {
  const userId = req.userId;
  const { name, contactInfo, skills, interests, linkedin, github, resume } =
    req.body;
  // console.log(req.body, "req.body");
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.contactInfo = contactInfo;
    skills.forEach((skill) => {
      if (!user.skills.includes(skill)) {
        user.skills.push(skill);
      }
    });
    user.interests = interests;
    user.linkedin = linkedin;
    user.github = github;
    user.resume = resume;
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Avatar Upload
const uploadAvatar = async (req, res) => {
  const userId = req.userId;
  const avatar = req.body.avatar;
  console.log(avatar, "avatar");
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.avatar = avatar;
    await user.save();
    res.status(200).json({ message: "Avatar uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add Student Project
const addStudentProject = async (req, res) => {
  const userId = req.userId;
  const { title, description, githubLink, demoLink, imageUrl } = req.body;
  // console.log(req.body, "req.body");
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newProject = new PersonalProject({
      title,
      description,
      githubLink,
      demoLink,
      image:
        imageUrl ||
        "https://ik.imagekit.io/jayanthmurala05/fahim-muntashir-aCeVa_v7OYg-unsplash.jpg?updatedAt=1753099545037",
    });
    await newProject.save();
    user.personalProjects.push(newProject._id);
    await user.save();
    res
      .status(200)
      .json({ message: "Project added successfully", data: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Student Projects
const getStudentProjects = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const projects = await PersonalProject.find({
      _id: { $in: user.personalProjects },
    });
    res.status(200).json({ data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Student Project
const deleteStudentProject = async (req, res) => {
  const userId = req.userId;
  const { projectId } = req.params;
  console.log(projectId, "projectId");
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Remove project from PersonalProject collection
    const deletedProject = await PersonalProject.findOneAndDelete({
      _id: projectId,
    });
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Remove reference from user's personalProjects array
    user.personalProjects = user.personalProjects.filter(
      (id) => id.toString() !== projectId
    );
    await user.save();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Set student's selected career path
export const setSelectedCareerPath = async (req, res) => {
  const userId = req.userId;
  const { careerPathId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.selectedCareerPath = careerPathId;
    await user.save();
    res.status(200).json({ message: "Career path saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student's selected career path
export const getSelectedCareerPath = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate("selectedCareerPath");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ selectedCareerPath: user.selectedCareerPath });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get resources for student's selected career path
export const getResourcesForSelectedCareerPath = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate("selectedCareerPath");
    if (!user || !user.selectedCareerPath)
      return res.status(404).json({ message: "No career path selected" });
    // Find resources matching requiredSkills
    const skills = user.selectedCareerPath.requiredSkills;
    const resources = await LearningResource.find({ skill: { $in: skills } });
    res.status(200).json({ resources });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a learning resource to user's savedLearningResources
export const saveLearningResourceToUser = async (req, res) => {
  const userId = req.userId;
  const { resourceId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.savedLearningResources.includes(resourceId)) {
      user.savedLearningResources.push(resourceId);
      await user.save();
    }
    res.status(200).json({ message: "Resource saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all saved learning resources for the user
export const getUserSavedLearningResources = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate("savedLearningResources");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ resources: user.savedLearningResources });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  userRegister,
  userLogin,
  getProfile,
  updateUser,
  uploadAvatar,
  addStudentProject,
  getStudentProjects,
  deleteStudentProject,
  saveLearningResourceToUser,
  getUserSavedLearningResources,
};
