const express = require('express');
const validate = require('../middlewares/validate-middleware');
const {applicationFormController,getApplicationDataController} = require('../controllers/applicationForm-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const { applicationFormSchema } = require('../validators/applicationForm-validator');

const router = express.Router();

// validate(applicationFormSchema)

router.route("/applicationForm").post( authMiddleware,validate(applicationFormSchema),applicationFormController);
router.route("/fetchApplicationData/:userId" ).get(authMiddleware, getApplicationDataController)
module.exports = router;


