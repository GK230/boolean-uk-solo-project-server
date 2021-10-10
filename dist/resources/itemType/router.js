"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getItem } from "./controller";
const controller_1 = require("./controller");
const router = express_1.Router();
// router.get("/", getItem);
router.get("/", controller_1.getItemType);
exports.default = router;
