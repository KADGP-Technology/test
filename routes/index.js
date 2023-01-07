var express = require('express');
var router = express.Router();
const path = require('path');
const { blogRouter } = require('./blog');



router.use('/blog', blogRouter)



module.exports = router;