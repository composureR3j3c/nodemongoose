const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type :String, require:true, min :1},
  price:{type : Number, require:true},
  productImage:{type : String, require:true},
});

module.exports = mongoose.model("Product", productSchema);
