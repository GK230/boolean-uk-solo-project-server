"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./resources/auth/router"));
const router_2 = __importDefault(require("./resources/users/router"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_3 = __importDefault(require("./resources/items/router"));
const controller_1 = require("./resources/items/controller");
const multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer_1.default({ storage: storage });
dotenv_1.config();
const app = express_1.default();
/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default("dev"));
app.use(router_1.default);
// app.use(loginAuth);
app.use("/users", router_2.default);
app.use("/items", router_3.default);
app.use("/uploads", express_1.default.static("uploads"));
/* SETUP ROUTES */
app.post("/upload_files", upload.array("files"), controller_1.uploadFiles);
app.get("*", (req, res) => {
    res.json({ ok: true });
});
/* START SERVER */
const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
