var express = require('express');
var router = express.Router();
const path = require('path');
const { blogRouter } = require('./blog');
const {userRouter} = require('./userRoute');



router.use('/blog', blogRouter)
router.use('/users',userRouter)



module.exports = router;