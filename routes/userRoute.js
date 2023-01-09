const express=require("express");
const userControl=require("../controller/User/user")
const router =express.Router();

router.post("/signup",userControl.signup);
router.post("/signin",userControl.signin);

exports.userRouter=router;