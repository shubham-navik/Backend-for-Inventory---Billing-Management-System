const express = require("express");
const router = express.Router();

const {createContact, getContacts, updateContact, deleteContact,searchContacts} = require("../controllers/contactControllers");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/createcontact", authMiddleware, createContact);
router.get("/getcontacts", authMiddleware, getContacts);
router.put("/updatecontact/:id", authMiddleware, updateContact);
router.delete("/deletecontact/:id", authMiddleware, deleteContact);
router.get("/searchcontacts", authMiddleware, searchContacts);



module.exports = router;