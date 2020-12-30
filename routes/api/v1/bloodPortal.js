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

// register as a donor
router.post("/donor", bloodDonorValidation, registerDonor);
// post requirement
router.post("/requestBlood", requestBloodValidation, requestBlood);

// export router
module.exports = router;
