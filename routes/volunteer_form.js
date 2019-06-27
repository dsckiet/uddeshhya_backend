const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Volunteer=require('../models/volunteer_form');
const joi=require('Joi');
joi.objectid=require('joi-objectid')(joi)


router.post('/',async(req,res)=>
{
    let volunteer=await Volunteer.findOne({email:req.body.email});
    if(volunteer)return res.status(400).send('sorry volunteer with this email id is already registered');
    
    volunteer=new Volunteer({
        email:req.body.email,
        name:req.body.name,
        currentContact:req.body.currentContact,
        alternateContact:req.body.alternateContact,
        currentAddress:req.body.currentAddress,
        permanentAddress:req.body.permanentAddress,
        Branch:req.body.Branch,
        year:req.body.year,
        bloodgroup:req.body.bloodgroup,
        belongToKIET:req.body.belongToKIET,
        knowAbout:req.body.knowAbout,
        heardAbout:req.body.heardAbout,
        commitToWork:req.body.commitToWork,
        otherSkill:req.body.otherSkill,
        Suggestion:req.body.Suggestion
    });
    try{
        await volunteer.save();
    }
    catch(ex){
       console.log(ex);
    }
 
    res.send(volunteer);
})
module.exports=router;
