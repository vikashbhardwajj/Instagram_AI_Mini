const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadImage = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

const createPostController = async (req, res) => {
  const file = req.file;

  const base64ImageFile = file.buffer.toString("base64");

  // const caption = await generateCaption(base64ImageFile);
  // const result = await uploadImage(file.buffer, `${uuidv4()}`);

  const [caption, result] = await Promise.all([
    generateCaption(base64ImageFile),
    uploadImage(file.buffer, `${uuidv4()}`),
  ]);

  const post = await postModel.create({
    image: result.url,
    caption: caption,
    user: req.user._id,
  });

  res.status(200).json({
    message: "File received successfully",
    post,
  });
};

module.exports = {
  createPostController,
};
