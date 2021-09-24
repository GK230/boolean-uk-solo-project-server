"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getItem } from "./controller";
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post("/", controller_1.addItem);
exports.default = router;
