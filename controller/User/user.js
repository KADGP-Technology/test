const userModel=require('../../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETE_KEY = "NOTESAPI"


const signup = async (req, res)=>{
  //Existing User Check
  //Hash Password
  //User creation
  //Token generate
  const {username, email, password}=req.body;
  try {
    const existingUser = await userModel.findOne({email : email});
    if (existingUser) {
        return res.status(400).json({message:"User alredy exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
        email:email,
        password:hashedPassword,
        username:username
    })

    const token = jwt.signin({email:result.email,id:result._id,SECRETE_KEY});
    res.status(201).json({user:result, token:token})

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"})
  }
}

const signin = async (req, res) => {
        const {email,password}=req.body;
        try {
            
const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "User Not Found" });
        }
            const matchPassword = await bcrypt.compare(password,existingUser.password)

            if(!matchPassword){
                return res.status(400).json({message:"Invalid Credential"})
            }

             const token = jwt.signin({
               email: existingUser.email,
               id: existingUser._id,
               SECRETE_KEY,
             });
             res.status(201).json({ user: existingUser, token: token });


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "something went wrong" });
        }
};

module.exports={signup,signin}