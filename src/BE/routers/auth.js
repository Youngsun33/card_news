const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { validateRegister } = require("../middlewares/validation");

router.post("/register",validateRegister,authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);
module.exports = router;
