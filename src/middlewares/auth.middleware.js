const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, please login again" });
  }
};

module.exports = authMiddleware;
