const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Id:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    validation:{
        type:String,
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    }
})

module.exports = mongoose.model("User",userSchema)