import { Schema, model } from "mongoose";
import { emailValidator } from "../../../utils/validators.js";

const schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: [emailValidator, "Invalid email"],
    },
    emailVerified: { type: Boolean, default: false },
    pass: { type: String, required: [true, "Password is required"] },
    company: { type: String, required: [true, "Company name is required"] },
  },
  { timestamps: true }
);

export const userModel = model("User", schema);
