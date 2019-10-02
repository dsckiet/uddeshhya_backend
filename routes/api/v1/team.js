const express = require('express');
const router = express.Router();

// load controllers
let {
	team,
	addTeamMember,
	updateTeamMember,
	deleteTeamMember,
	viewTeamMember
} = require('../../../controllers/team_controller');

// middlewares
let { adminAuth } = require('../../../middleware/auth');
let { teamValidation } = require('../../../middleware/validations');

// image uploader
let { upload } = require('../../../config/imgUpload');

// view team
router.get('/', team);
// add team member
router.post(
	'/add',
	adminAuth,
	upload.any(),
	teamValidation,
	addTeamMember
);
// update team member
router.post(
	'/update/:id',
	adminAuth,
	teamValidation,
	upload.single('file'),
	updateTeamMember
);
// delete team member
router.get('/delete/:id', adminAuth, deleteTeamMember);
//view a team member
router.get('/:id', adminAuth, viewTeamMember);

// export router
module.exports = router;
