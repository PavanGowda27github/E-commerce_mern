import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//signup user
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //create user
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.json({ message: "user registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    //compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "invalid password" });
    }
    //generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      message: "user logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
