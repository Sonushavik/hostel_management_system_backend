const mongoose  = require("mongoose")

const documentSchema =new  mongoose.Schema ({
        photo: {
                type: String,
                required: true
        },
        idProof: {
                type: String,
                required: true
        },
        signature: {
                type: String,
                required: true
        },
        cast:{
                type: String,
                required: true
        },
        matriculationMarksheet:{
                type: String,
                required: true
        },
        intermediateMarksheet: {
                type: String
        },
        graduationMarksheet: {
                type: String
        },
        extraCertificate1: {
                type: String
         },
         extraCertificate2: {
                type: String
         },
         extraCertificate3: {
                type: String
         },
        userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"User",
                        required:true,
        }
})

const Document = new mongoose.model("Document", documentSchema)
module.exports = Document;