const userModel=require('../../models/user')
const bcrypt = require("bcrypt");
const { response } = require('express');
const express = require('express');
const app = express();



const signup = async (req, res)=>{
  //Existing User Check
  //Hash Password
  //User creation
  //Token generate
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


  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"})
  }
}

const signin = async (req, res) => {
        const { email, password } =
          req.body;
        try {
            
const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "User Not Found" });
        }
            const matchPassword = await bcrypt.compare(password,existingUser.password)

            if(!matchPassword){
                return res.status(400).json({message:"Invalid Credential"})
            }

            
             res.status(201).json({ user: existingUser });


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" });
        }
};

//  API TO display data getting from db

getAlldata=(req,res)=>{
  userModel.find().then((users) => {
    res.send(users);
  }).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while getting list of users."
});
});
}

//API To update Data in db

updateData=(req,res)=>{
  console.log(req.params.id);
    userModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          ContactNumber: req.body.ContactNumber,
          email: req.body.email,
          password:req.body.password
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        update_data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}




module.exports = { signup, signin ,getAlldata, updateData};






