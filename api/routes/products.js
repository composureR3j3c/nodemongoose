const express = require("express");

const router = express.Router();

const checkAuth=require('../middleware/check-auth')

const multer = require("multer");
const ProductContoller = require("../controllers/products");
const { upload } = require("../middleware/upload");


router.get("/",ProductContoller.productGetAll);

router.get("/:productId", ProductContoller.productGetOne);

router.post("/",checkAuth, upload.single("productImage"), ProductContoller.productCreate);

router.patch("/:productId",checkAuth,ProductContoller.productUpdate);

router.delete("/:productId",checkAuth, ProductContoller.productDelete);
module.exports = router;
