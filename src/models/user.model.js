import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[a-z0-9_]{3,20}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid username`,
      },
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const numberOfSalts = 10;
    this.password = await bcryptjs.hash(this.password, numberOfSalts);
    next();
  } catch (err) {
    return next(err);
  }
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    isVerified : this.isVerified
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
userSchema.methods.isUserVerified = function () {
  return this.isVerified;
}

const User = mongoose.model("User", userSchema);

export default User;
