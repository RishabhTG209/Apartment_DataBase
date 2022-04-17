const mongoose = require("mongoose");

const bcrypt= require("bcryptjs");

const manager_schema = new mongoose.Schema({
    Name:{type:String,required:true },
    email:{type:String, required:true},
    password:{type:Number, required:true}
},{
    versionKey:false,
    timestamps:true,
});

manager_schema.pre("save", function(next){
    if(!this.isModified("password"))return next();
    
    var hash = bcrypt.hashSync(this.password,8)
    this.password = hash;
    return next();

});

manager_schema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("manager",manager_schema)