const express = require("express");
const userRouter = express.Router();
const userCtrl = require("../controllers/user");

//////////// inscription
userRouter.post("/signup", userCtrl.signUp);
////////////// connection
userRouter.post("/login", userCtrl.logIn);

module.exports = userRouter;
