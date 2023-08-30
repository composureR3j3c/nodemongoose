const express = require("express");

const router = express.Router();
const Order = require("../../models/order");
const Product = require("../../models/product");
const { default: mongoose } = require("mongoose");
const product = require("../../models/product");

router.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate('product','name')
    .exec()
    .then((docs) => {
      console.log("From DB", docs);

      if (docs) {
        const response = {
          count: docs.length,
          orders: docs.map((doc) => {
            return {
              product: doc.product,
              quantity: doc.quantity,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:8000/orders/" + doc._id,
              },
            };
          }),
        };
        res.status(200).json(response);
      } else res.status(404).json({ message: "No valid entry found" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then((doc) => {
      console.log("From DB", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:8000/orders",
          },
        });
      } else res.status(404).json({ message: "No valid entry found" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  
  Product.findById(req.body.productId)
    // .exec()
    .then(product => {
      // console.log("product")
      // if(!product){
      //   return res.status(404).json({ message: "Product not found" });
      // }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      order
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({
            message: "Created Order successfully",
            createdProduct: {
              quantity: result.quantity,
              product: result.product,
              _id: result._id,
              request: {
                type: "GET",
                url: "http://localhost:8000/orders/" + result._id,
              },
            },
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => res.status(500).json({message:"Product not found!",error:err}));
});

router.patch("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Updated order!",
  });
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message:"Order deleted",
        request:{
          type:'POST',
          url:'http://localhost:8000/orders',
          body:{productId:"String"}
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
