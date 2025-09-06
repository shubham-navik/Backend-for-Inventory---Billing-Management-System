const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  // get token from header
//   const authHeader = req.headers["authorization"];
  //     const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  // for testing purpose hardcoded token when you push on production remove this line and uncomment line 5 to 6
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGJhYTgyMjU4ZjRhZDY5YmFjZTlmMjYiLCJidXNpbmVzc0lkIjoiYWJjIiwiaWF0IjoxNzU3MTU2NDUwLCJleHAiOjE3NTcyNDI4NTB9.IoG5U-0HA99cmq4SDNWLzlsRLLxXXcivSVO3yI-uHxw";

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
