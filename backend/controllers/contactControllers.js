const Contact = require("../models/Contact");

// create a new contact
exports.createContact = async (req, res) => {
    try {
        const { name, phone, email, address, type } = req.body;
        const businessId = req.user.businessId;
    
        if (!name || !type) {
        return res.status(400).json({ message: "Name and Type are required" });
        }
    
        const newContact = new Contact({
        name,
        phone,
        email,
        address,
        type,
        businessId,
        });
    
        const savedContact = await newContact.save();
        res.status(201).json({message:"contact created succesfully",savedContact});
    } catch (error) {
        res.status(500).json({ message: "error in creating contact" });
    }
}

//get all contact for a business
exports.getContacts = async (req, res) => {
    try {
        const businessId = req.user.businessId;
        const contacts = await Contact.find({ businessId });
        res.status(200).json({
            message: "contacts fetched succesfully",
            contacts
        })
        
    } catch (error) {
        res.status(500).json({
            message: "error in fetching contacts"
        });
    }
}


//upadate Contact
exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const businessId = req.user.businessId;
        const existContact = await Contact.findById(id);
        if (!existContact) {
            return res.status(404).json({
                message: "contact not found"
            })
        }
        if (existContact.businessId !== businessId) {
            return res.status(403).json({
                message: "you are not authorized to update this contact"
            })
        }
        await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            message: "contact updated succesfully"
        })

    } catch (error) {
        res.status(500).json({
            message:"error in updateing contact"
        })
    }
}

//deldet contact
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const businessId = req.user.businessId;
        const existContact = await Contact.findById(id);
        if (!existContact) {
            return res.status(404).json({
                message: "contact not found"
            })
        }
        if (existContact.businessId !== businessId) {
            return res.status(403).json({
                message: "you are not authorized to delete this contact"
            })
        }
        await Contact.findByIdAndDelete(id);
        res.status(200).json({  
            message: "contact deleted succesfully"
        })

    } catch (error) {
        res.status(500).json({
            message:"error in deleting contact"
        })
    }
} 