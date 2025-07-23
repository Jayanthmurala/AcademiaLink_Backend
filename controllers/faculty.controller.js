import User from "../models/user.model.js";
import Publication from "../models/publications.model.js";

// Update Faculty Profile
const updateFacultyProfile = async (req, res) => {
  const userId = req.userId;
  const { name, contactInfo, researchInterests, areasOfExpertise, linkedin, github } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'faculty') {
      return res.status(404).json({ message: "Faculty not found" });
    }

    if (name !== undefined) user.name = name;
    if (contactInfo !== undefined) user.contactInfo = contactInfo;
    if (researchInterests !== undefined) user.researchInterests = researchInterests;
    if (areasOfExpertise !== undefined) user.areasOfExpertise = areasOfExpertise;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (github !== undefined) user.github = github;

    await user.save();
    res.status(200).json({ message: "Faculty profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new publication
const addPublication = async (req, res) => {
  const userId = req.userId;
  const { title, year, fileUrl } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'faculty') {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const newPublication = new Publication({
      title,
      year,
      link: fileUrl, // Use fileUrl for the link field
      postedBy: userId, // Use userId for the postedBy field
    });

    await newPublication.save();

    user.publications.push(newPublication._id);
    await user.save();

    res.status(201).json({ message: "Publication added successfully", publication: newPublication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  updateFacultyProfile,
  addPublication,
};
