import { config } from "dotenv";

import express, { Request, Response } from "express";

import authRouter from "./resources/auth/router";
import usersRouter from "./resources/users/router";
import cors from "cors";
import morgan from "morgan";
import { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import itemsRouter from "./resources/items/router";
import _ from "lodash";
import { uploadFiles } from "./resources/items/controller";
import multer from "multer";
import loginAuth from "./middlewares/loginAuth";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

declare global {
  namespace Express {
    interface Request {
      currentUser: string | JwtPayload;
    }
  }
}

config();

const app = express();

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(authRouter);

app.use(loginAuth);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);



// This is your gate keeper to make sure the user is logged in!
// Any route after this one will be protected by login!
// app.use(loginAuth);


/* SETUP ROUTES */
app.post("/upload_files", upload.array("files"), uploadFiles);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
