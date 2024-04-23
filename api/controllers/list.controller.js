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
export const getSearchListings = async (req, res, next) => {
  try {
    const limit = req.query.limit || 9;
    const startIndex = req.query.startIndex || 0;
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: ["false", "true"] };
    }
    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: ["false", "true"] };
    }

    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: ["false", "true"] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      furnished,
      parking,
      type,
      offer,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
