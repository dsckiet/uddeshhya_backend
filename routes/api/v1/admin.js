const express = require('express');
const router = express.Router();

// load controllers
let {
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
	viewProject
} = require('../../../controllers/admin_controller');

// middlewares
let { allAuth, adminAuth } = require('../../../middleware/auth');
let {
	userValidation,
	projectValidation
} = require('../../../middleware/validations');

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
router.post('/projects/add', allAuth, projectValidation, addProject);
// update a project
router.post('/projects/update/:id', allAuth, projectValidation, updateProject);
// delete a project
router.get('/projects/delete/:id', allAuth, deleteProject);
// view a project
router.get('/projects/:id', allAuth, viewProject);

// export router
module.exports = router;
