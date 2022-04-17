const manager = require("../models/manager.model");

require("dotenv").config();

const jwt = require("jsonwebtoken");
// const res = require("express/lib/response");

const newToken = (manager) => {
  return jwt.sign({ manager }, "process.env.jwt_sec_key");
};

const register = async (req, res) => {
  try {
    let manager_data = await manager.find({ email: req.body.email }).lean().exec();
    console.log(manager_data);

    if (manager_data.length !== 0) {
      return res
        .status(400)
        .send({ message: "account associated with this email already exist" });
    }

    manager_data = await manager.create(req.body);

    const token = newToken(manager_data);

    res.send({ manager_data, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const login = async (req,res) => {
  try {
    const manager_data = await manager
      .findOne({ email: req.body.email })
     

    if (!manager_data) {
      return res
        .status(400)
        .send({ message: "please check your email or password" });
    }

    const match = manager_data.checkPassword(req.body.password);

    if (!match) {

      return res
        .status(400)
        .send({ message: "please check your email or password" });
    }

    const token = newToken(manager_data);

    res.send({manager_data,token});

  } catch (e) {
    res.status(400).send(e.message);
  }
};



module.exports = { register, login ,newToken};
