const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');



router.get("/", authController.main)
router.get("/signup", authController.getSignup)
router.get("/login", authController.getLogin)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.post("/admin/logout", authController.adminLogout)
router.post("/signup", authController.signup)
module.exports = router