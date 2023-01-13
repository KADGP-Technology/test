const userModel=require('../../models/user')
const bcrypt = require("bcrypt");
const { response } = require('express');
const express = require('express');
const app = express();



exports.signup = async (req, res)=>{
 
  if(!req.body.email || req.body.email.length == 0) {res.status(201).send("please enter Email")
return; }
  if(!req.body.password || req.body.password.length == 0){ res.status(201).send("please enter Password")
return; }
  if(!req.body.ContactNumber || req.body.ContactNumber.length == 0){ res.status(201).send("please enter Number")
return; }

  const {FirstName, LastName,ContactNumber, email, password}=req.body;
  try {
    const existingUser = await userModel.findOne({email : email});
    if (existingUser) {
        return res.status(400).json({message:"User alredy exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      FirstName: FirstName,
      LastName: LastName,
      ContactNumber:ContactNumber,
      email: email,
      password: hashedPassword,
     
    });

  if(result){
    res.status(200).send("sucessfully signup")
  }
  else{
    res.status(201).send("please try again")
  }

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"})
  }
}

exports.signin = async (req, res) => {
  if(!req.body.email || req.body.email.length == 0){ res.status(201).send("please enter Email")
return;}
  if(!req.body.password || req.body.password.length == 0){ res.status(201).send("please enter Password")
  return;
}
  const { email, password } = req.body;
  try {
    existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ id : existingUser._id,
                           firstname : existingUser.FirstName,
                           lastname : existingUser.LastName,
                           email : existingUser.email });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//  API TO display data getting from db

exports.getUserData=(req,res)=>{
  userModel.findById(req.params.id)
  .then(data => {
      if(!data) {
          return res.status(notFound).send({
              success: false,
              message: "User not found with id " + req.params.id
          });
      }
      res.send({
          success: true,
          message: 'User successfully retrieved',
          data: data
      });
  }).catch(err => {
  if(err.kind === 'ObjectId') {
      return res.status(notFound).send({
          success: false,
          message: "User not found with id " + req.params.id
      });
  }
  return res.status(internalServerError).send({
      success: false,
      message: "Error retrieving user with id " + req.params.id
  });
});
}

//API To update Data in db

exports.updateUserData = async (req,res) => {
  if(!req.query.id){
    res.send("send user id")
    return;
  }

  if(!req.body.FirstName || !req.body.LastName || !req.body.email  || !req.body.ContactNumber) {
    return res.status(201).send({
        success: false,
        message: "Please enter required fields"
    });
}
if( req.body.password ){
const hashedPassword = await bcrypt.hash(req.body.password, 10);

req.body.password = hashedPassword
}
// find user and update
userModel.findByIdAndUpdate(req.query.id, {
    $set: req.body
}, {new: true})
    .then(data => {
        if(!data) {
            return res.status(300).send({
                success: false,
                message: "User not found with id " + req.query.id
            });
        }
        res.send({
            success: true,
            data: data
        });
    }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(300).send({
            success: false,
            message: "User not found with id " + req.query.id
        });
    }
    return res.status(500).send({
        success: false,
        message: "Error updating user with id " + req.query.id
    });
});
}













