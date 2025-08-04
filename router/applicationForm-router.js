const express = require('express');
const validate = require('../middlewares/validate-middleware');
const {applicationFormController,getApplicationDataController,documentController} = require('../controllers/applicationForm-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const { applicationFormSchema } = require('../validators/applicationForm-validator');
const documentSchema = require('../validators/document-validator')
const upload = require("../middlewares/multer-middleware")

const router = express.Router();

// validate(applicationFormSchema)

router.route("/applicationForm").post( authMiddleware,validate(applicationFormSchema),applicationFormController);
router.route("/fetchApplicationData/:userId" ).get(authMiddleware, getApplicationDataController)
router.route("/documents").post(authMiddleware,upload,validate(documentSchema),documentController)
module.exports = router;

