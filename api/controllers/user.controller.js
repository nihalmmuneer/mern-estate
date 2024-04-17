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
