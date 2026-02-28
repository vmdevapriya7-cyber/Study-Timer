const express = require("express");
const router = express.Router();
const sessionController = require('./controller');

router.post("/", sessionController.saveSession);
router.get("/", sessionController.getSessions);

module.exports = router;