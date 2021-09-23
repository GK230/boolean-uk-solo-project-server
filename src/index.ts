import { config } from "dotenv";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./resources/users/router";

import authRouter from "./resources/auth/router";
import loginAuth from "./middlewares/loginAuth";
import { JwtPayload } from "jsonwebtoken";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { addItem } from "./resources/items/controller";
import cookieParser from "cookie-parser";
import itemsRouter from "./resources/items/router"
import multerUploads from "multer"
const upload = multer({ dest: "uploads/" });



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });

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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(authRouter);
app.use("/user", usersRouter);
app.use(loginAuth);
app.use("/items", itemsRouter);


/* SETUP ROUTES */

app.post("/items", addItem);

app.post("/upload_files", upload.array("files"), addItem);

app.get("*", (req, res) => {
  res.json({ ok: true });
});


/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
