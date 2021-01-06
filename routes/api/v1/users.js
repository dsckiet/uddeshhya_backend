const express = require("express");
const router = express.Router();

// load controllers
let {
	login,
	users,
	addUser,
	updateUser,
	deleteUser,
	viewUser,
	init
} = require("../../../controllers/users_controller");

// middlewares
let { adminAuth } = require("../../../middleware/auth");
let { userValidation } = require("../../../middleware/validations");
let { catchErrors } = require("../../../config/errorHandler");

//login route
router.post("/login", catchErrors(login));
// view users list
router.get("/", catchErrors(adminAuth), catchErrors(users));
// add a user
router.post(
	"/add",
	catchErrors(adminAuth),
	catchErrors(userValidation),
	catchErrors(addUser)
);
// update a user
// router.post('/update/:id', adminAuth, userValidation, updateUser);
// delete a user
router.get("/delete/:id", catchErrors(adminAuth), catchErrors(deleteUser));
// view a user
router.get("/:id", catchErrors(adminAuth), catchErrors(viewUser));
// router.post("/init", catchErrors(init));
// export router
module.exports = router;
