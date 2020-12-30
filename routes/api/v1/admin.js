const express = require("express");
const router = express.Router();

// load controllers
let {
	admin,
	volunteers,
	donors,
	bloodRequests,
	messages,
	donations
} = require("../../../controllers/admin_controller");

// middlewares
let { adminAuth } = require("../../../middleware/auth");
let { catchErrors } = require("../../../config/errorHandler");

// admin dashboard
router.get("/", catchErrors(adminAuth), catchErrors(admin));
// view volunteers list
router.get("/volunteers", catchErrors(adminAuth), catchErrors(volunteers));
// view blood donors list
router.post("/bloodDonors", catchErrors(adminAuth), catchErrors(donors));
// view blood requests
router.get(
	"/bloodRequests",
	catchErrors(adminAuth),
	catchErrors(bloodRequests)
);
// view contact us messages
router.get("/messages", catchErrors(adminAuth), catchErrors(messages));
// money donors
router.get("/donations", catchErrors(adminAuth), catchErrors(donations));

// export router
module.exports = router;
