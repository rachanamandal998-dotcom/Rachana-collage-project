const express = require("express");
const { handleUserRegister, handleUserLogin, getAllUsers } = require("../controllers/userController");


const router = express.Router();

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get('/',getAllUsers)

module.exports = router;
