const express = require("express");
const app = express();
require(`dotenv`).config();
// {MONGO_DB_ATLAS}=

const productRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/users");
const orderRoutes = require("./api/routes/orders");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

async function connectDB() {
  

try {
  await mongoose.connect(
  `mongodb+srv://gezahegnebereket:${process.env.MONGO_DB_ATLAS}@node-rest-shop.z4cf2s4.mongodb.net/`
);
} catch (err) { 
  console.log(err)
  // mongoose.disconnect();
}
}

connectDB();

//make images publicly accisible via url
app.use('/uploads/data/image',express.static('uploads'))
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
