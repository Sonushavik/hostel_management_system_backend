const express = require('express');
const router = express.Router();
const contactFom = require("../controllers/contact-controller");
const validate = require('../middlewares/validate-middleware');
const { contactSchema } = require('../validators/contact-validator');

router.route("/contact").post(validate(contactSchema),contactFom);

module.exports = router;