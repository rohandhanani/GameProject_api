const router = require("express").Router();
const userController = require("../controllers/user.controller");

// Routes Auth //
router.post("/register", userController.userRegister);
router.post("/checkOtp", userController.checkOtp);
router.post("/login", userController.userLogin);

module.exports = router;