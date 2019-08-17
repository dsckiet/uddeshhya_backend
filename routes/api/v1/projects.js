const express = require('express');
const router = express.Router();

// load controllers
let {
	projects,
	addProject,
	updateProject,
	deleteProject,
	viewProject
} = require('../../../controllers/projects_controller');

// middlewares
let { allAuth, adminAuth } = require('../../../middleware/auth');
let { projectValidation } = require('../../../middleware/validations');

// image uploader
let { upload } = require('../../../config/imgUpload');

// all projects
router.get('/', projects);
// add a project
router.post(
	'/add',
	allAuth,
	projectValidation,
	upload.single('file'),
	addProject
);
// update a project
router.post(
	'/update/:id',
	allAuth,
	projectValidation,
	upload.single('file'),
	updateProject
);
// delete a project
router.get('/delete/:id', allAuth, deleteProject);
// view a project
router.get('/:id', viewProject);

// export router
module.exports = router;
