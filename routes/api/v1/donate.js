const express = require("express");
const router = express.Router();

// load controllers
let {
	createOrder,
	payment
} = require("../../../controllers/donation_controller");

let { donorValidation } = require("../../../middleware/validations");

// get donor details and create rzp order
router.post("/", donorValidation, createOrder);
// rzp payment redirect
router.post("/payment", payment);

// export router
module.exports = router;
