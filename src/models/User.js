import mongoose from "mongoose";
import bcrypt from "bcrypt";

/* Creating Schema */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    // for password reset and change
    type: Number,
  },
  verificationToken: String,
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  defaultaddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address", 
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* Hashing The Password */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

/* Creating Model */
const User = mongoose.model("User", userSchema);

export default User;
