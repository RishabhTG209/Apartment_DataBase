const express = require("express")
const Flat = require("../models/flat.model")
const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const flat = await Flat.create(req.body)
        res.send(flat)
    }catch(err){
        res.status(500).send(err.message)
    }
})


// Sorting the flats on the basis of Flat Number
router.get("/",async(req,res)=>{
    try{
        const query = req.query.sort 
        if(query==="1"){
            const flats = await Flat.find().sort({flat_no:1}).populate("flat_residents").lean().exec()
            res.send(flats)
        }
        else if(query==="2"){
            const flats = await Flat.find().sort({flat_no:-1}).populate("flat_residents").lean().exec()
            res.send(flats)
        }
        else{
            const flats = await Flat.find().populate("flat_residents").lean().exec()
            res.send(flats)
        }
    }catch(err){
        res.status(500).send(err.message)
    }
})

// Filtering the Flats on the basis of Flat block (A,B,C,D....)
router.get("/block",async(req,res)=>{
    try{
        const query = req.query.block
        const flat = await Flat.find({"flat_block":query}).populate("flat_residents").lean().exec()
        res.send(flat)
    }catch(err){
        res.status(500).send(err.message)
    }
})

// Filtering the Flats on the basis of Flat types (owner,tenants)
router.get("/type",async(req,res)=>{
    try{
        const query = req.query.type
        const flat = await Flat.find({"flat_type":query}).populate("flat_residents").lean().exec()
        res.send(flat)
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports = router