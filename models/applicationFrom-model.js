const {Schema, model, default: mongoose} = require("mongoose");

const formSchema = new Schema({
        name:{
                type: String,
                required:true,
        },
        fatherName:{
                type:String,
                required:true,
        },
        dob:{
                type:Date,
                required:true,
        },
        gender:{
                type:String,
                enum:['Male', 'Female', 'Other'],
                required: true
        },
        aadharNumber: {
                type:String,
                required:true,
        },
        mobileNumber: {
                type:String,
                required:true
        },
        email: {
                type:String,
        },
        address: {
                type:String,
                required:true,
        },
        college:{
                type:String,
                required:true,
        },
        course:{
                type:String,
                required:true,
        },
        session: {
                type: String,
                required:true,
        },
        currentAcademicSession: {
                type:String,
                required:true,
        },
        religion:{
                type:String,
                required:true,
        },
        category:{
                type:String,
                required:true,
        },
        caste:{
                type:String,
                required:true,
        },
        isAlloted: {
                type:Boolean,
                default:false
        },
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
        }
})

const ApplicationForm = new model("ApplicationForm", formSchema);
module.exports = ApplicationForm;
