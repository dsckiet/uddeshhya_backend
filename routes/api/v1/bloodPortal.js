const express = require("express");
const router = express.Router();

// load controllers
let {
	registerDonor,
	requestBlood
} = require("../../../controllers/bloodPortal_controller");

let {
	bloodDonorValidation,
	requestBloodValidation
} = require("../../../middleware/validations");
let { catchErrors } = require("../../../config/errorHandler");

// register as a donor
router.post(
	"/donor",
	catchErrors(bloodDonorValidation),
	catchErrors(registerDonor)
);
// post requirement
router.post(
	"/requestBlood",
	catchErrors(requestBloodValidation),
	catchErrors(requestBlood)
);

// export router
module.exports = router;
