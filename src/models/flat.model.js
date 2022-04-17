const mongoose = require('mongoose')


const flatSchema = new mongoose.Schema({
    flat_type:{type:String,required:true, default: "Owner"},
    flat_block:{type:String,required:true},
    flat_no: {type:Number,required:true},
    flat_residents: [{type:mongoose.Schema.Types.ObjectId, ref:"resident",required:true}]
},{
    versionKey:false,
    timestamps:true,
})

module.exports = mongoose.model('flat',flatSchema)