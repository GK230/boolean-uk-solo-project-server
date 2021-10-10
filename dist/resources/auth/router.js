"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../users/controller");
const controller_2 = require("./controller");
const router = express_1.Router();
// login
router.post("/login", controller_2.loginUser);
router.get("/logout", controller_2.logoutUser);
router.post("/signup", controller_1.createUser);
// logout??
exports.default = router;
