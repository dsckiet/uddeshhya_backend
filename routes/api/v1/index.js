const express = require("express");
const router = express.Router();

// load controller
const {
	index,
	contact,
	volunteer
} = require("../../../controllers/index_controller");

// middlewares
const {
	volunteerValidation,
	messageValidation
} = require("../../../middleware/validations");
let { catchErrors } = require("../../../config/errorHandler");

// index route - data for homepage
router.get("/", index);
// contact us
router.post("/contact", catchErrors(messageValidation), catchErrors(contact));
// submit volunteer form
router.post(
	"/volunteer",
	catchErrors(volunteerValidation),
	catchErrors(volunteer)
);

// export router
module.exports = router;
