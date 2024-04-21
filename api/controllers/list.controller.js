import Listing from "../models/list.model.js";
import { errorHandler } from "../utils/error.js";

export const listing = async (req, res, next) => {
  try {
    const createList = await Listing.create(req.body);
    return res.status(201).json(createList);
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req, res, next) => {
  const listing = await Listing.findByIdAndDelete(req.params.id);
  if (!listing) {
    return next(errorHandler(401, "Delete Action Denied!!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete Your own Listing!!"));
  }
  try {
    res.status(200).json("List Deleted Successfully!!");
  } catch (error) {
    next(error);
  }
};
