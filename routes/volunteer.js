const express = require("express");
const router = express.Router();

const volunteerController = require("../controllers/volunteerController");

router.post("/", volunteerController.volunteerForm);
router.get("/", volunteerController.volunteerList);

module.exports = router;
