const express = require("express");

const Resident = require("../models/resident.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const resident = await Resident.create(req.body);
    return res.status(201).send(resident);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

//Get All
router.get("/", async (req, res) => {
  try {
    const residents = await Resident.find().lean().exec();
    return res.status(200).send(residents);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

//get one
router.get("/:id", async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id).populate().lean().exec();
    return res.status(200).send(resident);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});


module.exports = router;