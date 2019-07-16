const express = require('express');
const router = express.Router();

// load controller
const {
	index,
	volunteerForm
} = require('../../../controllers/index_controller');

// middlewares
const { volunteerValidation } = require('../../../middleware/validations');

// index route - data for homepage
router.get('/', index);
// submit volunteer form
router.post('/', volunteerValidation, volunteerForm);

// export router
module.exports = router;
