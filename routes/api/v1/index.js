const express = require('express');
const router = express.Router();

// load controller
const {
	index,
	contact,
	volunteer
} = require('../../../controllers/index_controller');

// middlewares
const {
	volunteerValidation,
	messageValidation
} = require('../../../middleware/validations');

// index route - data for homepage
router.get('/', index);
// contact us
router.post('/contact', messageValidation, contact);
// submit volunteer form
router.post('/volunteer', volunteerValidation, volunteer);

// export router
module.exports = router;
