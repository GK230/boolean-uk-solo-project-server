import { config } from "dotenv";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./resources/users/router";

config();

const app = express();

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/user", usersRouter);

/* SETUP ROUTES */

app.get("*", (req, res) => {
  res.json({ ok: true });
});

// import usersRouter from "./resources/users/router";

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
