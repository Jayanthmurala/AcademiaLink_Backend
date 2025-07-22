import json from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const userMiddelware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token, "token");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }
  try {
    const decoded = json.verify(token, JWT_SECRET);
    // console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
    // console.log(error);
  }
};

export default userMiddelware;
