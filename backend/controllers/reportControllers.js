const Product = require("../models/Product");

//get inventory reports
exports.getInventoryReport = async (req, res) => {
    try {
        const businessId = req.user.businessId;
        const products = await Product
            .find({ businessId });
        res.status(200).json({
            message: "Inventory report fetched successfully",
            products
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error in fetching inventory report",
        })
    }
}    