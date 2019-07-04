const mongoose = require("mongoose");

//Contact Form schema
const contactFormSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    sharedMessage: {
        type: String,
        required: true
    }
});

const ContactForm = mongoose.model("contactForm", contactFormSchema);
module.exports = ContactForm;