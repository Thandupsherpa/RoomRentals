import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Blacklist from "../models/blacklist.model.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const register = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, password, role } = req.body;

    // Validation
    if (!firstName) {
      return res.status(400).json({ message: "First name is required" });
    }
    if (!lastName) {
      return res.status(400).json({ message: "Last name is required" });
    }

    // Check if user already exists (by email only, since names can repeat)
    const isAlreadyRegistered = await userModel.findOne({
      email: email
    });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create fullName for display purposes (optional)
    const fullName = middleName 
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;

    // Create user
    const user = await userModel.create({
      firstName,
      middleName: middleName || null, 
      lastName,
      fullName, 
      email,
      password: hashedPassword,
      role: role || "tenant"
    });

   
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      config.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        fullName: user.fullName,  
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    await Blacklist.create({ token });

    res.json({
      message: "Logged out successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};