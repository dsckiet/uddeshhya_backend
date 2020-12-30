const express = require("express");
const router = express.Router();

// load controllers
let {
	login,
	users,
	addUser,
	updateUser,
	deleteUser,
	viewUser
} = require("../../../controllers/users_controller");

// middlewares
let { adminAuth } = require("../../../middleware/auth");
let { userValidation } = require("../../../middleware/validations");

//login route
router.post("/login", login);
// view users list
router.get("/", adminAuth, users);
// add a user
router.post("/add", adminAuth, userValidation, addUser);
// update a user
// router.post('/update/:id', adminAuth, userValidation, updateUser);
// delete a user
router.get("/delete/:id", adminAuth, deleteUser);
// view a user
router.get("/:id", adminAuth, viewUser);

// export router
module.exports = router;
