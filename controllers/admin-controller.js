const ApplicationForm = require("../models/applicationFrom-model");
const Contact = require("../models/contact-model");
const User = require("../models/user-model");

const   getAllUsers = async(req,res,next) => {
        try {
                const users = await User.find({},{password:0});
                console.log(users)
                if(!users || users.length === 0){
                        return res.status(404).json({message: "No users Found"});
                }
                return res.status(200).json(users);
        } catch (error) {
                console.log(error);
                next(error)
               }
}

const getAllContacts = async(req,res,next) => {
        try {
                const contact =await Contact.find({});
                console.log(contact)
                if(!contact || contact.length === 0){
                        return res.status(404).json({message: "No Contact found"})
                }
                return res.status(200).json(contact);
        } catch (error) { 
                console.log(error)
                next(error)
        }
}

const getAllApplication = async(req,res,next) => {
        try {
                const application = await ApplicationForm.find();
                if(!application || application.length === 0){
                        return res.status(404).json({message: "no application found!!"})
                }

                return res.status(200).json(application);
        } catch (error) {
                console.log(error);
                next(error);
        }
}

const getApplicationById = async(req,res,next) =>  {
        try {
                const id = req.params.id;
                console.log(id);
                const applicationData =await ApplicationForm.findById(id);
                if(!applicationData){
                        res.status(404).json({message: "application not found!!"})
                }
                res.status(200).json(applicationData);
                next();
        } catch (error) {
                console.log(error);
                next(error);
        }
}

const updateApplication = async(req,res,next) => {
        const id = req.params.id;
        console.log(id);
        const updates = req.body;
        try {
                const updatedApplication = await  ApplicationForm.findByIdAndUpdate(
                        id,
                        updates,
                        { new: true, runValidators: true }
                );

                if(!updatedApplication){
                        return res.status(404).json({message: "Application not found!"});
                }
                res.status(200).json(updatedApplication);
                next();
        } catch (error) {
                console.log(error)
                next(error);
        }
}

const deleteUser = async(req,res,next) => {
        try {
                const userId = req.params.userId;
                const deleteuser = await User.findByIdAndDelete(userId);
                res.status(200).json({message: "user deleted successfully!!"})
                next();
        } catch (error) {
                console.log(error);
                next(error)
        }
}

const deleteApplication = async(req,res,next) => {
        try {
                const id = req.params.applicationId;
                const deleteApplication = await ApplicationForm.findByIdAndDelete(id);
                res.status(200).json({message: "Application deleted successfully!!"})
                next();
        } catch (error) {
                console.log(error)
                next(error);
        }
}

const deleteContact = async(req,res,next) => {
        try {
                        const id = req.params.contactId;
                        console.log(id)
                        const deleteContact = await Contact.findByIdAndDelete(id);
                        console.log(deleteContact)
                        res.status(200).json({message: "Contact deleted Successfully!!"});
                        next();
        } catch (error) {
                next(error);
        }
}


module.exports = {getAllUsers, getAllContacts, getAllApplication, deleteUser, deleteApplication,deleteContact, getApplicationById,updateApplication}