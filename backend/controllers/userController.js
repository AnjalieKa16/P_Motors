import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// JWT secret
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findUserByEmail(email);
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(user.id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user.id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};


// controllers/userController.js
const getUserProfile = async (req, res) => {
  try {
    // req.user should be set by authMiddleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await userModel.findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ data: user });
  } catch (err) {
    console.error(err); // This will show the real error in your backend console
    res.status(500).json({ message: 'Server error' });
  }
};

export { registerUser, loginUser,getUserProfile };
