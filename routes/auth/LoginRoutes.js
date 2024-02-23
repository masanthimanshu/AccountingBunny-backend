import { Router } from "express";
import { compareSync } from "bcrypt";
import { generateToken } from "../../utils/token.js";
import { userModel } from "../../database/model/user/UserModel.js";

export const routes = Router();

routes.post("/email", async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).send({
      error: "Missing required fields",
    });
  }

  try {
    const data = await userModel.findOne({ email });
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
