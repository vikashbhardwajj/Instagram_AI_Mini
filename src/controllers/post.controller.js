const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");

const createPostController = async (req, res) => {
  const file = req.file;
  console.log("file received:", file);

  const base64ImageFile = file.buffer.toString("base64");

  const caption = await generateCaption(base64ImageFile);

  res.status(200).json({
    message: "File received successfully",
    caption,
  });
};

module.exports = {
  createPostController,
};
