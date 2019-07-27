const express = require('express');
const router = express.Router();

// load controllers
let {
	login,
	users,
	addUser,
	updateUser,
	deleteUser,
	viewUser,
	volunteers,
	projects,
	addProject,
	updateProject,
	deleteProject,
	viewProject,
	team,
	addTeamMember,
	updateTeamMember,
	deleteTeamMember,
	viewTeamMember
} = require('../../../controllers/admin_controller');

// middlewares
let { allAuth, adminAuth } = require('../../../middleware/auth');
let {
	userValidation,
	projectValidation,
	teamValidation
} = require('../../../middleware/validations');

// image uploader
let { upload } = require('../../../config/imgUpload');

//login route
router.post('/login', login);
// view users list
router.get('/users', adminAuth, users);
// add a user
router.post('/users/add', adminAuth, userValidation, addUser);
// update a user
router.post('/users/update/:id', adminAuth, userValidation, updateUser);
// delete a user
router.get('/users/delete/:id', adminAuth, deleteUser);
// view a user
router.get('/users/:id', adminAuth, viewUser);
// view volunteers list
router.get('/volunteers', allAuth, volunteers);
// all projects
router.get('/projects', projects); // not authenticating since could also be used for homepage
// add a project
router.post(
	'/projects/add',
	allAuth,
	projectValidation,
	upload.single('file'),
	addProject
);
// update a project
router.post(
	'/projects/update/:id',
	allAuth,
	projectValidation,
	upload.single('file'),
	updateProject
);
// delete a project
router.get('/projects/delete/:id', allAuth, deleteProject);
// view a project
router.get('/projects/:id', allAuth, viewProject);
// view team
router.get('/team', allAuth, team);
// add team member
router.post(
	'/team/add',
	adminAuth,
	teamValidation,
	upload.single('file'),
	addTeamMember
);
// update team member
router.post(
	'/team/update/:id',
	adminAuth,
	teamValidation,
	upload.single('file'),
	updateTeamMember
);
// delete team member
router.get('/team/delete/:id', adminAuth, deleteTeamMember);
//view a team member
router.get('/team/:id', adminAuth, viewTeamMember);
// export router
module.exports = router;
