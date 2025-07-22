import uploadToCloudinary from "../uitls/cloudnary.js";

const uploadImages = async (req, res) => {
  const file = req.file;

  // console.log(file, "file");
  try {
    if (!file) {
      return res.status(400).json({
        message: "image Not Provide",
        error: true,
        success: false,
      });
    }

    const url = await uploadToCloudinary(file.buffer);

    // console.log(url, "url");
    if (!url) {
      return res.status(400).json({
        message: "Some Thing Went Wrong Try Again After Some Time !",
        error: true,
        success: false,
      });
    }
    return res.status(201).json({
      message: "Image URL",
      data: url.url,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Issus",
      error: true,
      success: false,
    });
  }
};

export default uploadImages;
