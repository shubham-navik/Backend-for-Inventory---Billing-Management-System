const Transaction = require("../models/Transaction");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// create transaction
exports.createTransaction = async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { type, customerId, vendorId, products } = req.body;

    let totalAmount = 0;

    if (type === "sale") {
      for (let product of products) {
        const productDetails = await Product.findById(
          new mongoose.Types.ObjectId(product.productId)
        );

        if (!productDetails) {
          return res.status(404).json({ message: `Product not found` });
        }

        if (productDetails.stock < product.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for product ${productDetails.name}`
          });
        }

        // decrease stock
        productDetails.stock -= product.quantity;
        await productDetails.save();

        totalAmount += product.price * product.quantity;
      }

      const newTransaction = new Transaction({
        type,
        customerId,
        products,
        totalAmount,
        businessId
      });
      await newTransaction.save();
    } else if (type === "purchase") {
      for (let product of products) {
        const productDetails = await Product.findById(
          new mongoose.Types.ObjectId(product.productId)
        );

        if (!productDetails) {
          return res.status(404).json({ message: `Product not found` });
        }

        // increase stock
        productDetails.stock += product.quantity;
        await productDetails.save();

        totalAmount += product.price * product.quantity;
      }

      const newTransaction = new Transaction({
        type,
        vendorId,
        products,
        totalAmount,
        businessId
      });
      await newTransaction.save();
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    res.status(201).json({
      message: "Transaction created successfully",
    //   totalAmount
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in creating transaction",
      error: error.message
    });
  }
};



//get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
         
        const businessId = req.user.businessId;
        const transactions = await Transaction.find({ businessId });
        res.status(200).json({
            message: "transacions fetched successfully",
            transactions
        });


    } catch (err) {
        res.status(500).json({
            message:"Error in getting transactions"
        })
     }
}
 

// get customers transactions
exports.getCustomerTransactions = async (req, res) => {
    try { 
        const businessId = req.user.businessId;
        const customerTransacions = await Transaction.find({
            businessId, type: "sale"
        });
        res.status(200).json({
            message: "customer transactions fetched successfully",
            customerTransacions
        })

    }
    catch (err) {
        res.status(500).json({
            message:"error in getting customer transcations"
        })
    }
}

// get vendor transactions
exports.getVendorTransactions = async (req, res) => {
    try { 
        const businessId = req.user.businessId;
        const vendorTransacions = await Transaction.find({
            businessId, type: "purchase"
        });
        res.status(200).json({
            message: "vendor transactions fetched successfully",
            vendorTransacions
        })

    }
    catch (err) {
        res.status(500).json({
            message:"error in getting vendor transcations"
        })
    }
}