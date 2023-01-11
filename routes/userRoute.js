const express=require("express");
const userControl=require("../controller/User/user");

const router =express.Router();
const app = express();


router.post("/signup",userControl.signup);
router.post("/signin",userControl.signin);
router.get("/getdata",userControl.getAlldata);
router.put("/updatedata/:id",userControl.updateData);

exports.userRouter=router;



