const express = require("express");
const router = express.Router();

const { createProduct,getProducts,updateProduct } = require("../controllers/productControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/createproduct", authMiddleware, createProduct);
router.get("/getproducts", authMiddleware, getProducts);
router.put("/updateproduct/:id", authMiddleware, updateProduct);
// router.delete("/deleteproduct/:id", authMiddleware, deleteProduct);


module.exports = router;