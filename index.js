const express = require('express')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const app = express()
var cors = require('cors');
app.use(cors());
var indexRouter = require('./routes/index');
var databaseConnection = require('./db/index');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use(cookieParser());


const { createTokens, validateToken } = require('./middleware');


                          const port = 8080;
                          app.listen(port, () => console.log(`🚀 Listening on port ${port}...`));
                          
  