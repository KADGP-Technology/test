const express=require("express");
const userControl=require("../controller/User/user");

const router =express.Router();


router.post("/signin",userControl.signin);
router.post("/signup",userControl.signup);
router.get("/getdata/:id",userControl.getUserData);
router.post("/updatedata",userControl.updateUserData);

exports.userRouter=router;



