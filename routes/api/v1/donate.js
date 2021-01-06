const express = require("express");
const router = express.Router();

// load controllers
let {
	createOrder,
	payment
} = require("../../../controllers/donation_controller");

let { donorValidation } = require("../../../middleware/validations");
let { catchErrors } = require("../../../config/errorHandler");

// get donor details and create rzp order
router.post("/", catchErrors(donorValidation), catchErrors(createOrder));
// rzp payment redirect
router.post("/payment", catchErrors(payment));

// export router
module.exports = router;
