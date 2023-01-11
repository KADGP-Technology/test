const mongoose=require('mongoose')

const UserSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: { 
      type: String,
      required: true,
    },
    ContactNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
 
  },
  { timesamps: true }
);

module.exports=mongoose.model("User",UserSchema)