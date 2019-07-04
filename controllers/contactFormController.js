require("dotenv").config();
const ContactForm = require("../models/ContactForm");

//Storing the Contact Form data in db
const contactForm = async(req, res) => {
    let {
        email,
        name,
        phone,
        sharedMessage
    } = req.body;

    //Insuring that the user can't send same message again & again
    let contact = await ContactForm.findOne({ email: req.body.email });
    if (contact.sharedMessage === req.body.sharedMessage)
        return res
            .status(200)
            .json({ message: "You can't send same message again!" });

    contact = new ContactForm({
        email,
        name,
        phone,
        sharedMessage
    });

    //Storing the data in db
    try {
        await contact.save();
        res.status(200).json({ message: "success", error: false });
    } catch (err) {
        res.status(400).json({ message: err.message, error: true });
    }
};

//Displaying the data from db to Admin
const contactFormList = async(req, res) => {
    try {
        let data = await ContactForm.find();
        res.status(200).json({ message: "success", error: false, data });
    } catch (err) {
        res.status(400).json({ message: err.message, error: true, data: null });
    }
};

module.exports = {
    contactForm,
    contactFormList
};