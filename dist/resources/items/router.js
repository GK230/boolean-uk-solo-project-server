"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { addItem } from "./controller";
// router.post("/upload_)", addItem);
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/", controller_1.uploadFiles);
exports.default = router;
