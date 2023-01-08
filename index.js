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

const mongoose=require("mongoose")
const { createTokens, validateToken } = require('./middleware');


 //connection
 
mongoose.connect(
  "mongodb+srv://gaurav71:gaurav71@cluster0.4z9k9br.mongodb.net/?retryWrites=true&w=majority"
).then(()=>{
    const port = 7080;
    app.listen(port, () => console.log(`🚀 Listening on port ${port}...`));
                          

}).catch((error)=>{
    console.log.error(error)
})
 //

 