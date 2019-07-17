const express = require('express');
const router = express.Router();

// load controller
const { index, volunteer } = require('../../../controllers/index_controller');

// middlewares
const { volunteerValidation } = require('../../../middleware/validations');

// index route - data for homepage
router.get('/', index);
// submit volunteer form
router.post('/volunteer', volunteerValidation, volunteer);

// export router
module.exports = router;
