import { Router } from "express";
import { decodeToken } from "../../utils/token.js";
import { userModel } from "../../database/model/user/UserModel.js";

export const routes = Router();

routes.get("/data", async (req, res) => {
  const { authorization } = req.headers;

  const uid = decodeToken(authorization).data;

  try {
    const data = await userModel.findById(uid);
    if (!data) {
      res.status(404).send({ message: "User does not exists" });
    } else {
      res.send({
        email: data.email,
        company: data.company,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        emailVerified: data.emailVerified,
      });
    }
  } catch (err) {
    res.status(502).send({ error: err.message });
  }
});
