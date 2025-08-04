const { default: mongoose } = require("mongoose");
const ApplicationForm = require("../models/applicationFrom-model");
const documentSchema = require("../validators/document-validator");
const uploadOnCloudinary = require("../utils/cloudinary");
const Document = require("../models/document-model");

const applicationFormController = async (req, res) => {
	try {

		const formData = req.body;
		const { userId } = formData;

		const userExist = await ApplicationForm.findOne({ userId });
		if (userExist) {
			return res.status(400).json({
				message: `user with userId: ${userId} is already applied!!`,
			});
		}
		const newForm = new ApplicationForm(formData);
		console.log(newForm);
		await newForm.save();

		res.status(201).json({
			message: "Application submitted successfully.",
			data: newForm,
		});
	} catch (error) {
		console.error("Error in applicationFormController: ", error.message);
		res.status(500).json({
			message: "Server error while submitting application.",
			error: error.message,
		});
	}
};

const getApplicationDataController = async (req, res) => {
	const { userId } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).json({ error: "Invalid userId" });
		}

                const applicationData = await ApplicationForm.findOne({userId});
		const studentDocuments = await Document.findOne({userId})

                if(!applicationData){
                        return res.status(404).json({message: 'Application not found!!'})
                }

                res.status(200).json({
      			application: applicationData,
      			documents: studentDocuments || {},
    		});

	} catch (error) {
		console.log("Error fetching application:", error);
                res.status(401).json({error: 'Internal Server Error'});
	}
};

const documentController = async(req, res) => {

		const userId = req.user._id;
		const isDocumentUploaded = await Document.findOne({userId})

		if(isDocumentUploaded){
			return res.status(409).json({
				message: "File is already uploaded!"
			})
		}

		try {
			const uploadedUrls = {};
			for(const [fieldName, files] of Object.entries(req.files || {})){
				const filePath = files[0].path;
				// console.log(fieldName, " => ", filePath);
				const result = await uploadOnCloudinary(filePath, 'Student_documents');
				uploadedUrls[fieldName] = result.secure_url;
				// console.log(uploadedUrls)
			}
 
			 const input = {
                	 photo: uploadedUrls.photo || "",
      			idProof: uploadedUrls.idProof || "",
      			signature: uploadedUrls.signature || "",
      			cast: uploadedUrls.cast || "",
      			matriculationMarksheet: uploadedUrls.matriculationMarksheet || "",
      			intermediateMarksheet: uploadedUrls.intermediateMarksheet,
      			graduationMarksheet: uploadedUrls.graduationMarksheet,
      			extraCertificate1: uploadedUrls.extraCertificate1,
     			 extraCertificate2: uploadedUrls.extraCertificate2,
      			extraCertificate3: uploadedUrls.extraCertificate3,
    			};

			documentSchema.parse(input);
			console.log(req.user._id)
			const newDoc = await Document.create({
				userId: req.user?._id || null,
      				...input
			})

    			return res.status(200).json({ 
				message: "Document uploaded successfully!",
				document: newDoc,
			 });
			
		} catch (error) {
			 return res.status(422).json({
      			message: "Upload failed. Fix the errors.",
      			errors: error.errors,
   			 });
		}

}

module.exports = { applicationFormController, getApplicationDataController, documentController };
