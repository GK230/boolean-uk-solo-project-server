"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../items/controller");
const controller_2 = require("./controller");
const router = express_1.Router();
router.get("/", controller_2.getAllUsers);
router.get("/", controller_1.getUserItems);
exports.default = router;
