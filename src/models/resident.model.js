const mongoose = require("mongoose");

const bcrypt= require("bcryptjs");

const resident_schema = new mongoose.Schema({
    Name:{type:String,required:true },
    Gender:{type:String, required:true},
    Age:{type:Number, required:true}
},{
    versionKey:false,
    timestamps:true,
});

module.exports = mongoose.model("resident",resident_schema)