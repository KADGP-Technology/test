const express=require("express");
const userControl=require("../controller/User/user")
const router =express.Router();

router.post("/post",userControl.signup);
router.post("/post",userControl.signup);

exports.userRouter=router;