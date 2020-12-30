const express = require("express");
const router = express.Router();

// load controllers
let {
	team,
	addTeamMember,
	updateTeamMember,
	deleteTeamMember,
	viewTeamMember
} = require("../../../controllers/team_controller");

// middlewares
let { adminAuth } = require("../../../middleware/auth");
let { teamValidation } = require("../../../middleware/validations");
let { catchErrors } = require("../../../config/errorHandler");

// image uploader
let { upload } = require("../../../config/imgUpload");

// view team
router.get("/", catchErrors(team));
// add team member
router.post(
	"/add",
	catchErrors(adminAuth),
	upload.any(),
	catchErrors(teamValidation),
	catchErrors(addTeamMember)
);
// update team member
// router.post(
// 	'/update/:id',
// 	adminAuth,
// 	teamValidation,
// 	upload.single('file'),
// 	updateTeamMember
// );
// delete team member
router.get(
	"/delete/:id",
	catchErrors(adminAuth),
	catchErrors(deleteTeamMember)
);
//view a team member
router.get("/:id", catchErrors(adminAuth), catchErrors(viewTeamMember));

// export router
module.exports = router;
