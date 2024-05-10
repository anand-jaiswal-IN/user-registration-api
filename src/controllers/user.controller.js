import validator from "validator";
import httpCodes from "../utils/httpCodes.js";
import { ApiError, ApiResponse } from "../utils/apiutility.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import OTP from "../models/otp.model.js";
import { sendOTPonEmail } from "../utils/mailService.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // validation of upcoming data
  {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username))
      return res
        .status(httpCodes["Not Acceptable"])
        .json(
          new ApiError(
            httpCodes["Not Acceptable"],
            "Invalid username Found. Use only lowercase letters, numbers and underscore. minimum length : 3 and maximum length : 20"
          )
        );

    if (!validator.isEmail(email))
      return res
        .status(httpCodes["Not Acceptable"])
        .json(
          new ApiError(httpCodes["Not Acceptable"], "Invalid E-mail Found.")
        );

    if (!validator.isStrongPassword(password))
      return res
        .status(httpCodes["Not Acceptable"])
        .json(
          new ApiError(
            httpCodes["Not Acceptable"],
            "Password is not strong. Create a strong password of desired length."
          )
        );
  }

  // if user exists already
  if (await User.findOne({ $or: [{ username }, { email }] })) {
    return res
      .status(httpCodes["Conflict"])
      .json(
        new ApiError(
          httpCodes["Conflict"],
          "User Already Exists. Try to register with another username and password"
        )
      );
  }

  // creating user doc in database
  const user = await User.create({
    username,
    email,
    password,
  });
  const userCreated = await User.findById(user._id).select(
    "-password -createdAt -updatedAt -__v"
  );
  // sending positive response
  return res
    .status(httpCodes["Created"])
    .json(
      new ApiResponse(
        httpCodes["Created"],
        "User created successfully",
        userCreated
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  {
    // if user does not exists
    if (!user)
      return res
        .status(httpCodes["Not Acceptable"])
        .json(
          new ApiError(
            httpCodes["Not Acceptable"],
            "Invalid Credentials. username or email is incorrect"
          )
        );
    // if password is incorrect
    if (!(await user.isPasswordCorrect(password)))
      return res
        .status(httpCodes["Not Acceptable"])
        .json(
          new ApiError(
            httpCodes["Not Acceptable"],
            "Invalid Credentials. password is incorrect"
          )
        );
  }
  const accessToken = user.generateAccessToken();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(
      Date.now() +
        parseInt(process.env.ACCESS_TOKEN_EXPIRY) * 24 * 60 * 60 * 1000
    ), // access token expiray has value '5d' in my case, choose accordingly
  });

  return res
    .status(httpCodes["OK"])
    .json(new ApiResponse(httpCodes["OK"], "User Logged in Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  delete req.user;
  res.clearCookie("accessToken");
  return res
    .status(httpCodes["OK"])
    .json(new ApiResponse(httpCodes["OK"], "User Logged Out Successfully"));
});

const generateOtp = asyncHandler(async (req, res) => {
  try {
    if (req.user?.isVerified)
      return res
        .status(httpCodes["Not Acceptable"])
        .json(
          new ApiError(
            httpCodes["Not Acceptable"],
            "User Already Verified. No need to verify again"
          )
        );
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit otp

    // send otp in mail
    const msgInfo = await sendOTPonEmail(req?.user?.email, otp);
    await OTP.deleteMany({ user: req?.user?._id });
    await OTP.create({ user: req.user._id, otp, messageID: msgInfo.messageId });

    return res
      .status(httpCodes["Created"])
      .json(
        new ApiResponse(
          httpCodes["Created"],
          "OTP is Generated. Check your Email"
        )
      );
  } catch (error) {
    return res
      .status(httpCodes["Internal Server Error"])
      .json(new ApiError(httpCodes["Internal Server Error"], error?.message));
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const optDoc = await OTP.findOne({ user: req?.user?._id });

  if (!(await optDoc.isOtpCorrect(otp))) {
    return res
      .status(httpCodes["Not Acceptable"])
      .json(new ApiError(httpCodes["Not Acceptable"], "Invalid OTP"));
  }
  await OTP.findByIdAndDelete(optDoc._id);
  await User.findByIdAndUpdate(req?.user?._id, { $set: { isVerified: true } });

  return res
    .status(httpCodes["OK"])
    .json(new ApiResponse(httpCodes["OK"], "User Verified Successfully"));
});

export { registerUser, loginUser, logoutUser, generateOtp, verifyUser };
