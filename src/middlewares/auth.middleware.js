import User from "../models/user.model.js";
import { ApiError } from "../utils/apiutility.js";
import asyncHandler from "../utils/asyncHandler.js";
import httpCodes from "../utils/httpCodes.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  try {
    if (!token)
      return res
        .status(httpCodes["Unauthorized"])
        .json(
          new ApiError(
            httpCodes["Unauthorized"],
            "User Authorization Required."
          )
        );
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select("-password -__v");
    if (!user) {
      return res
        .status(httpCodes["Unauthorized"])
        .json(new ApiError(httpCodes["Unauthorized"], "Invalid Access Token"));
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(httpCodes["Unauthorized"])
      .json(
        new ApiError(
          httpCodes["Unauthorized"],
          error?.message || "Invalid access token"
        )
      );
  }
});

const isUserVerified = asyncHandler(async (req, res, next) => {
  verifyJWT();
  if (!req.user?.isVerified) {
    return res
      .status(httpCodes["Unauthorized"])
      .json(
        new ApiError(
          httpCodes["Unauthorized"],
          "User Not Verified. verify the user"
        )
      );
  }
  next();
});

export { verifyJWT, isUserVerified };
