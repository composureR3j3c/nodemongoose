
const User = require("../../models/user");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const { token } = require("morgan");

exports.userSignup=(req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({ message: "email exists" });
        } else {
          var salt = bcrypt.genSaltSync(10);
          password = bcrypt.hashSync(req.body.password, salt);
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: password,
          });
          user.save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: "User Created successfully",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({error:err});
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({error:err});
      });
  }

exports.userLogin=(req, res, next) => {
    var result=10
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          result+=30
          console.log("result",);
          return res.status(401).json({ message: "Auth Failed!!" });
        } else {
          bcrypt.compare(req.body.password,user[0].password,function(err, resp) {
            if(err){
              return res.status(500).json({error:err});
            }
            else if (resp === true ) {
           
             const token= jwt.sign({
                email:user[0].email,
                userId:user[0]._Id,
              },process.env.JWT_KEY,{expiresIn:"1h"})
              return res.status(200).json({ message: "Auth Success!", token:token  });
            }
            else 
            // if(resp === false)
            {
              array.forEach(element => {
                
              });
              console.log("result",result);
              return res.status(401).json({ message: "Auth Failed!"});
            } 
        });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({error:err});
      });
  }

exports.userDelete= (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "User deleted",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }