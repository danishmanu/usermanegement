const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")



router.get("/",adminController.adminCheck, adminController.getUser)


router.get("/view/:id",adminController.adminCheck, adminController.viewUser)

router.get("/edit/:id",adminController.adminCheck, adminController.editUser)

router.put("/edit/:id", adminController.updateUser)

router.delete('/delete/:id', adminController.deleteUser)

router.get("/add", adminController.addPage)

router.post("/add", adminController.addUser)
router.post("/search",adminController.search)

module.exports = router