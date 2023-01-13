
const express = require('express');
const router = express.Router();
const blogcontrol  = require("../controller/blog/index")


router.get('/get', blogcontrol.getAllblog);
router.get('/:id', blogcontrol.getDetails)


 exports.blogRouter = router;