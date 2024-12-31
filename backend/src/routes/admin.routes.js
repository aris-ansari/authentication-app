const adminRouter = require("express").Router();
const checkAuthentication = require("../middlewares/auth.middleware");
const admin = require("../controllers/admin.controller");

adminRouter.get("/users", checkAuthentication, admin);

module.exports = adminRouter;
