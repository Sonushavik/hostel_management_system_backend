const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const ApplicationForm = require("./applicationFrom-model");
require('dotenv').config();
const userSchema = new mongoose.Schema({
        username: {
                type: String,
                required: true,
        },
        email:{
                type: String,
                required: true,
        },
        phone:{
                type: Number,
                required:true,
        },
        password: {
                type: String,
                required: true,
        },
        isAdmin:{
                type:Boolean, 
                default: false,
        },
})

userSchema.methods.comparePassword = async function(password){
        return bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function(){
        try {
                return jwt.sign(
                        {
                                userId: this._id.toString(),
                                email: this.email,
                                isAdmin: this.isAdmin,
                        },
                        process.env.JWT_SECRET_KEY,
                        {
                                expiresIn: "30d",
                        }
                )
                
        } catch (error) {
                console.log(error);
        }
}

userSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    const deletedApp = await ApplicationForm.findOneAndDelete({ userId: doc._id });
    if (deletedApp) {
      console.log(`Deleted application for ${doc.username}`);
    } else {
      console.log(`No application found for ${doc.username}`);
    }
  }
});

const User = new mongoose.model("User", userSchema);
module.exports = User