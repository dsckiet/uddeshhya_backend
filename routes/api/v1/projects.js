const express = require("express");
const router = express.Router();

// load controllers
let {
	projects,
	addProject,
	updateProject,
	deleteProject,
	viewProject
} = require("../../../controllers/projects_controller");

// middlewares
let { adminAuth } = require("../../../middleware/auth");
let { projectValidation } = require("../../../middleware/validations");
let { catchErrors } = require("../../../config/errorHandler");

// image uploader
let {
	multer,
	imageFileFilter
} = require("../../../middleware/fileUploadValidations");

// all projects
router.get("/", catchErrors(projects));
// add a project
router.post(
	"/add",
	catchErrors(adminAuth),
	multer.any(),
	imageFileFilter,
	catchErrors(projectValidation),
	catchErrors(addProject)
);
// update a project
// router.post(
// 	"/update/:id",
// 	catchErrors(adminAuth),
// 	multer.any(),
// 	imageFileFilter,
// 	catchErrors(projectValidation),
// 	catchErrors(updateProject)
// );
// delete a project
router.get("/delete/:id", catchErrors(adminAuth), catchErrors(deleteProject));
// view a project
router.get("/:id", catchErrors(viewProject));

// export router
module.exports = router;
