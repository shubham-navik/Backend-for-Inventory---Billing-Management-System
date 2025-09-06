const express = require("express");
const router = express.Router();

const { createProduct,getProducts,updateProduct,searchProducts,deleteProducts } = require("../controllers/productControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/createproduct", authMiddleware, createProduct);
router.get("/getproducts", authMiddleware, getProducts);
router.put("/updateproduct/:id", authMiddleware, updateProduct);
router.delete("/deleteproduct/:id", authMiddleware, deleteProducts);
router.get("/searchproducts", authMiddleware, searchProducts);


module.exports = router;