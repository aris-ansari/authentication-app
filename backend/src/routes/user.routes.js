const router = require("express").Router();
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation.middleware");
const { register, login } = require("../controllers/user.controller");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
