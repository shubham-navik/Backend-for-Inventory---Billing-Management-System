const express = require("express");
const router = express.Router();

const { getInventoryReport } = require("../controllers/reportControllers");

const { authMiddleware } = require("../middleware/authMiddleware");
router.get("/getinventoryreport", authMiddleware, getInventoryReport);

module.exports = router;