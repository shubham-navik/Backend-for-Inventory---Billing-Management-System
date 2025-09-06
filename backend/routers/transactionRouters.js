const express = require("express");
const router = express.Router();

const { createTransaction, getAllTransactions,getCustomerTransactions,getVendorTransactions } = require("../controllers/transactionControllers");
const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/createtransaction", authMiddleware,createTransaction);
router.get("/getalltransactions", authMiddleware, getAllTransactions);
router.get("/customertransactions", authMiddleware, getCustomerTransactions);
router.get("/vendortransactions", authMiddleware, getVendorTransactions);

module.exports = router;