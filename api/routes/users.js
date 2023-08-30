const express = require("express");

const router = express.Router();
const User = require("../../models/user");
const { default: mongoose } = require("mongoose");
const bcrypt= require('bcryptjs')

router.post("/signup", (req, res, next) => {
    var salt = bcrypt.genSaltSync(10);
    password=bcrypt.hashSync(req.body.password,salt);
    const user=new User({
        _id: new mongoose.Types.ObjectId(),
        email:req.body.email,
        password:password
    })
    user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User Created successfully",
        
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})

module.exports = router;
