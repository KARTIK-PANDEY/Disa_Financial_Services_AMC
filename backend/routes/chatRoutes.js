const express = require("express");
const { chatWithGemini } = require("../controllers/chatController");

const router = express.Router();

router.post("/", chatWithGemini);

module.exports = router;