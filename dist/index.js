"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./resources/users/router"));
const router_2 = __importDefault(require("./resources/auth/router"));
const loginAuth_1 = __importDefault(require("./middlewares/loginAuth"));
// import { addItem } from "./resources/items/controller";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_3 = __importDefault(require("./resources/items/router"));
const controller_1 = require("./resources/items/controller");
const multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = (0, multer_1.default)({ storage: storage });
(0, dotenv_1.config)();
const app = (0, express_1.default)();
/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", methods: ["GET", "POST"], credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use(router_2.default);
app.use("/user", router_1.default);
app.use(loginAuth_1.default);
app.use("/items", router_3.default);
// app.use(authRouter);
// app.use("/user", usersRouter);
// app.use("/items", loginAuth, itemsRouter);
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
/* SETUP ROUTES */
app.post('/upload_files', upload.array("files"), controller_1.uploadFiles);
// async (req, res) => {
//   try {
//       if(!req.files) {
//           res.send({
//               status: false,
//               message: 'No file uploaded'
//           });
//       } else {
//           // //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//           // let avatar = req.files.avatar;
//           // //Use the mv() method to place the file in upload directory (i.e. "uploads")
//           // avatar.mv('./uploads/' + avatar.name);
//           // //send response
//           // res.send({
//           //     status: true,
//           //     message: 'File is uploaded',
//           //     data: {
//           //         name: avatar.name,
//           //         mimetype: avatar.mimetype,
//           //         size: avatar.size
//           //     }
//           // });
//           // 
//               }
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });
// //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
// let avatar = req.files.avatar;
// //Use the mv() method to place the file in upload directory (i.e. "uploads")
// avatar.mv('./uploads/' + avatar.name);
// //send response
// res.send({
//     status: true,
//     message: 'File is uploaded',
//     data: {
//         name: uploadFiles.name,
//           });
//       }
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });
// app.post("/items", loginAuth, addItem);
// app.post("/items", getItem)
app.get("*", (req, res) => {
    res.json({ ok: true });
});
/* START SERVER */
const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
