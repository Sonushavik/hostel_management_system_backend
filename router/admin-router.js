const express = require('express');
const {getAllUsers, getAllContacts, getAllApplication, deleteUser, deleteApplication, deleteContact, getApplicationById, updateApplication} = require("../controllers/admin-controller");
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const router = express.Router()

router.route("/users").get(authMiddleware,adminMiddleware,getAllUsers)
router.route("/contact").get(authMiddleware,adminMiddleware,getAllContacts)
router.route("/applications").get(authMiddleware,adminMiddleware,getAllApplication)
router.route("/application/:id").get(authMiddleware,adminMiddleware,getApplicationById)
router.route("/application/:id").patch(authMiddleware,adminMiddleware,updateApplication)
router.route("/user/:userId").delete(authMiddleware,adminMiddleware,deleteUser)
router.route("/application/:applicationId").delete(authMiddleware,adminMiddleware,deleteApplication)
router.route("/contact/:contactId").delete(authMiddleware,adminMiddleware,deleteContact)

module.exports = router;