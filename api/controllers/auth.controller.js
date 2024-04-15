import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const signUp = async (req, res, next) => {
  const { username, password, email } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, password: hashPassword, email });
  try {
    await newUser.save();
    res.status(201).json("User registered successfully!!");
  } catch (error) {
    next(error);
  }
};
