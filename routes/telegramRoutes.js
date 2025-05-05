const express = require("express");
const {
  publishProductFromRequest,
} = require("../controllers/productController");
const router = express.Router();

router.post("/send-product", publishProductFromRequest);

module.exports = router;
