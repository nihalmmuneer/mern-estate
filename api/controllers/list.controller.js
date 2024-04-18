import Listing from "../models/list.model.js";

export const listing = async (req, res, next) => {
  try {
    const createList = await Listing.create(req.body);
    return res.status(201).json(createList);
  } catch (error) {
    next(error);
  }
};
