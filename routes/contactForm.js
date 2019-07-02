const express = require("express");
const router = express.Router();

const contactFormController = require("../controllers/contactFormController");

router.post("/", contactFormController.contactForm);
router.get("/", contactFormController.contactFormList);

module.exports = router;
