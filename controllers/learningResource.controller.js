import LearningResource from "../models/LearningResource.model.js";

// Get all learning resources
export const getAllLearningResources = async (req, res) => {
  try {
    const resources = await LearningResource.find().populate("skill");
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single learning resource by ID
export const getLearningResourceById = async (req, res) => {
  try {
    const resource = await LearningResource.findById(req.params.id).populate(
      "skill"
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new learning resource
export const createLearningResource = async (req, res) => {
  try {
    const resource = new LearningResource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a learning resource
export const updateLearningResource = async (req, res) => {
  try {
    const resource = await LearningResource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.json(resource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a learning resource
export const deleteLearningResource = async (req, res) => {
  try {
    const resource = await LearningResource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
