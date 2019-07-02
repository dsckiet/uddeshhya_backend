const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/dbconnection');

router.post('/register', (req, res) => {
  let newAdmin = new Admin({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    profile: req.body.profile
  });
  Admin.addAdmin(newAdmin, (err, admin) => {
    if (err) {
      let message = "";
      let message1 = "";

      if (err.errors.name != undefined)
        if (err.errors.name.kind == "required" || err.errors.email.kind == "required" || err.errors.password.kind == "required" || err.errors.contact.kind == "required" || err.errors.profile.kind == "required") message = "All entries are Mandatory. ";
      if (err.errors.email != undefined)
        if (err.errors.email.kind == "unique") message1 = "Email already exists. ";

      //return res.json(err);
      return res.json({
        success: false,
        error: "Admin validation failed!",
        entrynull: message,
        email: message1
      });
    }
    if (newAdmin.contact.length != 10)
      return res.json({
        success: false,
        message: "Phone No. is Wrong"
      });
    if (req.body.password.length < 8)
      return res.json({
        success: false,
        message: "Password should be of at least 8 characters"
      });
    return res.json({
      success: true,
      message: "Admin registration is Successful."
    });

  });
});

// router.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     Admin.getAdminByUsername(username, (err, admin) => {
//         if (err) throw err;
//         if (!admin) {
//             return res.json({
//                 success: false,
//                 message: "Admin not found"
//             });
//         }
//         Admin.comparePassword(password, admin.password, (err, isMatch) => {
//             if (err) throw err;
//             if (isMatch) {
//                 const token = jwt.sign({
//                     type: "admin",
//                     data: {
//                         _id: admin._id,
//                         username: admin.username,
//                         name: admin.name,
//                         email: admin.email,
//                         contact: admin.contact,
//                         job_profile: admin.job_profile
//                     }
//                 }, config.secret, {
//                         expiresIn: 604880 //for 1 week time in ms
//                     },
//                     { algorithm: 'RS256' }
//                 );
//                 return res.json({
//                     success: true,
//                     token: "JWT " + token
//                 });
//             } else {
//                 return res.json({
//                     success: false,
//                     message: "Wrong Password"
//                 });
//             }
//         });
//     });
// });

// //Get Authenticated User Profile
// router.get('/profile', passport.authenticate('jwt', {
//     session: false
// }), (req, res) => {
//     return res.json(req.user);
// });

module.exports = router;
