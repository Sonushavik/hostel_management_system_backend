const { default: mongoose } = require("mongoose");
const ApplicationForm = require("../models/applicationFrom-model");
const {
	applicationFormSchema,
} = require("../validators/applicationForm-validator");
const { Types } = require("mongoose");
const validate = require("../middlewares/validate-middleware");

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

                if(!applicationData){
                        return res.status(404).json({message: 'Application not found!!'})
                }

                 res.status(200).json(applicationData);
	} catch (error) {
		console.log("Error fetching application:", error);
                res.status.json({error: 'Internal Server Error'});
	}
};

module.exports = { applicationFormController, getApplicationDataController };
