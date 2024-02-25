import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import * as router from "./routes/routes.js";
import { verifyToken } from "./utils/token.js";

const port = process.env.PORT;
const database = process.env.DATABASE_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

app.use("/secure", async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    await verifyToken(authorization);
    next();
  } catch {
    res.status(401).send({ message: "Invalid token" });
  }
});

app.use("/auth", router.authRoutes);
app.use("/secure/profile", router.profileRoutes);

app.get("/", (req, res) => {
  res.send({ message: "It's Working 🔥", ip: req.ip });
});

app.listen(port, () => {
  console.log(`Active on http://localhost:${port}`);
});

connect(database).then(() => console.log("Database Connected"));
