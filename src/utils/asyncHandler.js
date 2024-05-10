import { ApiError } from "./apiutility.js";

const asyncHandler = (fn) =>{
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(err.statusCode || 500).json(new ApiError(500, err));
      console.error(err);
    }
  };
}
export default asyncHandler;