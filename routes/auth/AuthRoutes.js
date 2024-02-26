import { Router } from "express";
import { hashSync, compareSync } from "bcrypt";
import { generateToken } from "../../utils/token.js";
import { signUpError } from "../../database/error/SignUpError.js";
import { UserModel } from "../../database/model/user/UserModel.js";

export const routes = Router();

routes.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).send({
      error: "Missing required fields",
    });
  }

  try {
    const data = await UserModel.findOne({ email });
    if (!data) {
      res.status(404).send({ message: "User does not exists" });
    } else {
      if (compareSync(pass, data.pass)) {
        const token = generateToken(data._id.toString());
        res.send({ status: "Success", verified: data.emailVerified, token });
      } else {
        res.status(401).send({ message: "Password does not match" });
      }
    }
  } catch (err) {
    res.status(502).send({ error: err.message });
  }
});

routes.post("/signup", async (req, res) => {
  const { name, email, pass, company } = req.body;

  if (!name || !email || !pass || !company) {
    return res.status(400).send({
      error: "Missing required fields",
    });
  }

  const userData = new UserModel({
    name,
    email,
    company,
    pass: hashSync(pass, 15),
  });

  try {
    const data = await userData.save();
    const token = generateToken(data._id.toString());
    res.send({ status: "Success", token });
  } catch (err) {
    signUpError(err, res);
  }
});
