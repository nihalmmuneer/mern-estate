import Listing from "../models/list.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "API is Working!!",
  });
};
export const updateUser = async (req, res, next) => {
  console.log(req.user);
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Updation is not permitted!"));
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
      },
    },
    { new: true }
  );
  const { password, ...rest } = updateUser._doc;
  res.status(200).json(rest);
};
export const DeleteAccount = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Access Denied"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.clearCookie("access_token");
  res.status(200).json("User is Deleted");
};
export const getUserListings = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(
        errorHandler(401, "You have only access to your own listings.. !!")
      );
    } else {
      const userList = await Listing.find({ userRef: req.params.id });
      res.status(200).json(userList);
    }
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(401, "User not Found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
