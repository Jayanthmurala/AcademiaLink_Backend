import Skill from "../models/Skill.model.js";
import User from "../models/user.model.js";
import axios from "axios";
import CareerPath from "../models/CareerPath.model.js";
import dotenv from "dotenv";
dotenv.config();

// Create a new skill
export const createSkill = async (req, res) => {
  try {
    const { name, description, tags } = req.body;
    const skill = new Skill({ name, description, tags });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a skill to a user
export const addUserSkill = async (req, res) => {
  try {
    const { userId, skillName } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.skills.includes(skillName)) {
      user.skills.push(skillName);
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a skill from a user
export const removeUserSkill = async (req, res) => {
  try {
    const { userId, skillName } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.skills = user.skills.filter((s) => s !== skillName);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Helper to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get best learning resources for a skill using Gemini API
export const getLearningResources = async (req, res) => {
  try {
    const { skill } = req.query;
    const prompt = `List the top 3 online learning resources (courses, videos, articles) for learning the skill: ${skill}. For each, provide: title, url, type (course, video, article), and a short description. Respond ONLY with a JSON array, no markdown or code block, no explanation and make sure the video links work.`;
    const geminiApiKey = process.env.GEMINI_API_KEY;
    // Use the flash model
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          response_mime_type: "application/json",
        },
      }
    );
    // Log Gemini response for debugging
    // console.log(
    //   "Gemini response for skill:",
    //   skill,
    //   JSON.stringify(geminiResponse.data, null, 2)
    // );
    const text =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error(
        "No text content found in Gemini response for skill:",
        skill
      );
      return res
        .status(500)
        .json({ message: "Failed to get a valid response from AI service." });
    }

    let resources;
    try {
      // The response from Gemini should be a clean JSON string.
      resources = JSON.parse(text);
    } catch (parseError) {
      console.error("Error parsing Gemini JSON response:", parseError);
      console.error("Raw response text from Gemini:", text);
      return res
        .status(500)
        .json({
          message: "Failed to parse learning resources from AI service.",
        });
    }
    // Add a delay to avoid 429 errors
    await delay(1500);
    res.json(resources);
  } catch (error) {
    console.error("Gemini resource fetch error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all career paths
export const getCareerPaths = async (req, res) => {
  try {
    const paths = await CareerPath.find();
    res.json(paths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get required skills for a specific career path
export const getCareerPathSkills = async (req, res) => {
  try {
    const { name } = req.query;
    const path = await CareerPath.findOne({ name });
    if (!path)
      return res.status(404).json({ message: "Career path not found" });
    res.json(path.requiredSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
