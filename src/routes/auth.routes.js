// use for api kon kon se hai aur logic in auth.controller

const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
