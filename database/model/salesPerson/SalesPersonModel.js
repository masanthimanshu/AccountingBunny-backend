import { Schema, model } from "mongoose";
import { emailValidator } from "../../../utils/validators.js";

const schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [emailValidator, "Invalid email"],
    },
    name: { type: String, required: [true, "Name is required"] },
    user: { type: String, required: [true, "UserId is required"] },
  },
  { timestamps: true }
);

export const salesPersonModel = model("SalesPerson", schema);
