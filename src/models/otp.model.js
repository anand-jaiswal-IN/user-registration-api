import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const optSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  messageID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: process.env.OTP_EXPIRY,
  },
});

optSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();
  try {
    const numberOfSalts = 10;
    this.otp = await bcryptjs.hash(this.otp, numberOfSalts);
    next();
  } catch (err) {
    return next(err);
  }
});
optSchema.methods.isOtpCorrect = async function (otp) {
  return await bcryptjs.compare(otp, this.otp);
};
const OTP = mongoose.model("OTP", optSchema);
export default OTP;
