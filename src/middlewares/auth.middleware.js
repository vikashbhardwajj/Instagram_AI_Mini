const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await userModel.findById(decoded.id);
    const user = await userModel.findOne({ _id: decoded.id });
    console.log(decoded)

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, please login again" });
  }
};

module.exports = authMiddleware;
