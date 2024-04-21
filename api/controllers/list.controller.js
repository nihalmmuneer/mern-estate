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

export const updateList = async (req, res, next) => {
  try {
    const list = await Listing.findById(req.params.id);
    if (!list) {
      return next(errorHandler(404, "No List Found!!"));
    }
    if (req.user.id !== list.userRef) {
      return next(
        errorHandler(401, "Edit option only possible to your own listing..")
      );
    }

    const updatedlist = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedlist) {
      return next(errorHandler(404, "List not found"));
    }
    res.status(200).json(updatedlist);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const getList = await Listing.findById(req.params.id);
    if (!getList) {
      next(errorHandler(404, "List not Found"));
    }
    res.status(200).json(getList);
  } catch (error) {
    next(error);
  }
};
