import { Router } from "express";
import { decodeToken } from "../../utils/token.js";
import { salesPersonError } from "../../database/error/SalesPersonError.js";
import { SalesPersonModel } from "../../database/model/salesPerson/SalesPersonModel.js";

export const routes = Router();

routes.post("/add", async (req, res) => {
  const { authorization } = req.headers;

  const { name, email } = req.body;
  const user = decodeToken(authorization).data;

  if (!name || !email) {
    return res.status(400).send({
      error: "Missing required fields",
    });
  }

  const salesPerson = new SalesPersonModel({ name, email, user });

  try {
    await salesPerson.save();
    res.send({ status: "Success", message: "Salesperson added" });
  } catch (err) {
    salesPersonError(err, res);
  }
});
