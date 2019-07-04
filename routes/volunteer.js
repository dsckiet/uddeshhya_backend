const express = require("express");
const router = express.Router();

const volunteerController = require("../controllers/volunteerController");

router.post("/", volunteerController.volunteerForm);

//Showing Volunteer Form Entries to only verified users
router.get('/', passport.authenticate('jwt', {
    session: false
}), volunteerController.volunteerList);

module.exports = router;