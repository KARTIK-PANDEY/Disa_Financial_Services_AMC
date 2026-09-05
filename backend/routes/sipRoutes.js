const express = require("express");
const { explainSip } = require("../controllers/sipController");

const router = express.Router();

router.post("/explain", explainSip);

module.exports = router;