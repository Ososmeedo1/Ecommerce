import User from "../../../database/models/User.js";
import catchError from "../../middleware/catchError.js";
import AppError from "../../utils/Error.js";

export const addAddress = catchError(async (req, res, next) => {
  const address = await User.findByIdAndUpdate(req.user.id, {
    $push : {address:req.body.address}
  }, { new: true });
  return res.status(201).json({ message: "done" ,address});
});

export const getAddress = catchError(async (req, res, next) => {
  const address = await User.find();
  return address.length == 0
    ? next(new AppError("not found address", 404))
    : res.status(201).json({ message: "done", address });
});

export const deleteAddress = catchError(async (req, res, next) => {
    const address = await User.findByIdAndUpdate(req.user.id, {
        $pull : {address:{_id : req.params.id}}
      },{new : true});
  return !address
    ? next(new AppError("not found address", 404))
    : res.status(201).json({ message: "done", address });
});
