import { Router } from "express";
import { decodeToken } from "../../utils/token.js";
import { filterArray } from "../../utils/filterData.js";
import { salesPersonError } from "../../database/error/SalesPersonError.js";
import { SalesPersonModel } from "../../database/model/salesPerson/SalesPersonModel.js";

export const routes = Router();

routes.get("/data", async (req, res) => {
  const { authorization } = req.headers;
  const user = decodeToken(authorization).data;

  try {
    const data = await SalesPersonModel.find({ user });
    console.log(data);
    if (data.length === 0) {
      res.status(404).send({ message: "No Salesperson exists" });
    } else {
      res.send(filterArray(data));
    }
  } catch (err) {
    res.status(502).send({ error: err.message });
  }
});

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
