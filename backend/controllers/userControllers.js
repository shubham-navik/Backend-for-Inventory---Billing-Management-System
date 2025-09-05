const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//register user
exports.registerUser = async (req, res) => {
    const { username, email, password, businessId } = req.body;
    try {
        if (!username || !email || !password || !businessId) {
            return res.status(400).json({
                message:"All field are required"
            })
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const existingBusiness = await User.findOne({ businessId });
        if (existingBusiness) {
            return res.status(400).json({ message: "Business ID already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            businessId
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });

    }
}

//login user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        if(!username || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid usename credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, businessId: user.businessId },
            JWT_SECRET,
            { expiresIn: "24h" }
        );
        res.status(200).json({ token, message: "Login successful" });

        
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

