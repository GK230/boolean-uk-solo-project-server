import { config } from "dotenv";

import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./resources/users/router";
import formidable from "formidable"
import authRouter from "./resources/auth/router";
import loginAuth from "./middlewares/loginAuth";
import { JwtPayload } from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { addItem } from "./resources/items/controller";
import cookieParser from "cookie-parser";
import itemsRouter from "./resources/items/router"
import multerUploads from "multer"
import dbClient from "./utils/database";
import Loki from 'lokijs';

const upload = multer({ dest: "uploads/" });

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
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use(authRouter);
// app.use("/user", usersRouter);
// app.use(loginAuth);
// app.use("/items", itemsRouter);

app.use(authRouter);
app.use("/user", usersRouter);
app.use("/items", loginAuth, itemsRouter);



/* SETUP ROUTES */

app.post("/upload_files", upload.array("files"), uploadFiles);
function uploadFiles(req: Request, res: Response) {
    console.log(req.body.path);
    res.json({ message: "Successfully uploaded files" });
}



app.post("/items", loginAuth, addItem);

// app.post("/items", getItem)
// app.post("itemType", getItem)

// app.post("/items", upload.array("files"), addItem);

app.get("*", (req, res) => {
  res.json({ ok: true });
});


/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
