const express = require('express');
const router = express.Router();

// load controllers
let {
	admin,
	volunteers,
	donors,
	bloodRequests
} = require('../../../controllers/admin_controller');

// middlewares
let { allAuth, adminAuth } = require('../../../middleware/auth');

// admin dashboard
router.get('/', allAuth, admin);
// view volunteers list
router.get('/volunteers', allAuth, volunteers);
// view blood donors list
router.post('/bloodDonors', allAuth, donors);
// view blood requests
router.get('/bloodRequests', allAuth, bloodRequests);

// export router
module.exports = router;
