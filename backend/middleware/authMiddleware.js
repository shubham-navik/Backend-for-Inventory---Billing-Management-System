const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  // get token from header
//   const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGJhYTgyMjU4ZjRhZDY5YmFjZTlmMjYiLCJidXNpbmVzc0lkIjoiYWJjIiwiaWF0IjoxNzU3MDYzMjYxLCJleHAiOjE3NTcxNDk2NjF9.u-jHEOEk2pE6W40YH_Y0DgNteMOLZrBSOWx14ibPfw8";

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded; // now req.user = { userId, businessId }
      console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
