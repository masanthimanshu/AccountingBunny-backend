import { Router } from "express";
import { hashSync } from "bcrypt";
import { generateToken } from "../../utils/token.js";
import { signUpError } from "../../database/error/SignUpError.js";
import { userModel } from "../../database/model/user/UserModel.js";

export const routes = Router();

routes.post("/email", async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).send({
      error: "Missing required fields",
    });
  }

  const userData = new userModel({ email, pass: hashSync(pass, 15) });

  try {
    const data = await userData.save();
    const token = generateToken(data._id.toString());
    res.send({ status: "Success", token });
  } catch (err) {
    signUpError(err, res);
  }
});
