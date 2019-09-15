const express = require('express');
const router = express.Router();

// load controllers
let {
	admin,
	volunteers,
	donors,
	bloodRequests,
	messages,
	donations
} = require('../../../controllers/admin_controller');

// middlewares
let { adminAuth } = require('../../../middleware/auth');

// admin dashboard
router.get('/', adminAuth, admin);
// view volunteers list
router.get('/volunteers', adminAuth, volunteers);
// view blood donors list
router.post('/bloodDonors', adminAuth, donors);
// view blood requests
router.get('/bloodRequests', adminAuth, bloodRequests);
// view contact us messages
router.get('/messages', adminAuth, messages);
// money donors
router.get('/donations', adminAuth, donations);

// export router
module.exports = router;
