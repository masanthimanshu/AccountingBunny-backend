import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import * as router from "./routes/routes.js";

const port = process.env.PORT;
const database = process.env.DATABASE_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

app.use("/auth/login", router.loginRoutes);
app.use("/auth/verify", router.verifyToken);
app.use("/auth/signup", router.signupRoutes);

app.get("/", (req, res) => {
  res.send({ message: "It's Working 🔥", ip: req.ip });
});

app.listen(port, () => {
  console.log(`Active on http://localhost:${port}`);
});

connect(database).then(() => console.log("Database Connected"));
