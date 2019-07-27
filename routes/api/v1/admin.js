const express = require('express');
const router = express.Router();

// load controllers
let { admin, volunteers } = require('../../../controllers/admin_controller');

// middlewares
let { allAuth, adminAuth } = require('../../../middleware/auth');

// admin dashboard
router.get('/', allAuth, admin);
// view volunteers list
router.get('/volunteers', allAuth, volunteers);

// export router
module.exports = router;
