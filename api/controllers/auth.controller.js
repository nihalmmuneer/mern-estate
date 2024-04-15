import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const signUp = async (req, res) => {
  const { username, password, email } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, password: hashPassword, email });
  try {
    await newUser.save();
    res.status(201).json("User registered successfully!!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
