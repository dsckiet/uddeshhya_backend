const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

//Admin Schema
const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    }
});

AdminSchema.plugin(uniqueValidator);

module.exports = Admin = mongoose.model('Admin', AdminSchema);

//Find by Id
module.exports.getAdminById = function (id, callback) {
    Admin.findById(id, callback);
}

//Find the Admin by it's Email
module.exports.getAdminByEmail = function (email, callback) {
    const query = {
        email: email
    }
    Admin.findOne(query, callback);
};

//to register the Admin
module.exports.addAdmin = function (newAdmin, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) return err;
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
}

//Compare Password
module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}