const express = require("express");
const passport = require('passport');
const router = express.Router();

const contactFormController = require("../controllers/contactFormController");

router.post("/", contactFormController.contactForm);

//Showing Contact Form Entries to only verified users
router.get('/', passport.authenticate('jwt', {
    session: false
}), contactFormController.contactFormList);

module.exports = router;