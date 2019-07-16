const express = require('express');
const router = express.Router();

const {
	volunteerForm,
	volunteerList
} = require('../../../controllers/volunteerController');

router.post('/', volunteerForm);
router.get('/', volunteerList);

module.exports = router;
