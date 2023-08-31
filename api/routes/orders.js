const express = require("express");

const router = express.Router();


const checkAuth=require('../middleware/check-auth');
const OrdersController = require("../controllers/orders");

router.get("/",OrdersController.orderGetAll);

router.get("/:orderId", OrdersController.orderGetOne);

router.post("/",checkAuth, OrdersController.orderCreate);


router.delete("/:orderId", OrdersController.orderDelete);
module.exports = router;
