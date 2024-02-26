import { Schema, model } from "mongoose";
import { emailValidator, phoneValidator } from "../../../utils/validators.js";

const schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [emailValidator, "Invalid email"],
    },
    company: { type: String },
    currency: { type: String },
    panNumber: { type: String },
    paymentTerms: { type: String },
    openingBalance: { type: Number, default: 0 },
    name: { type: String, required: [true, "Name is required"] },
    user: { type: String, required: [true, "UserId is required"] },
    phone: { type: Number, validate: [phoneValidator, "Invalid email"] },
  },
  { timestamps: true }
);

export const CustomerModel = model("Customer", schema);
