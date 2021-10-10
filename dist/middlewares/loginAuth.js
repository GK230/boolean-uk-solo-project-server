"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authGenerator_1 = require("../utils/authGenerator");
exports.default = (req, res, next) => {
    const token = req.cookies.token;
    const userData = token && authGenerator_1.validateToken(token);
    if (userData) {
        req.currentUser = userData;
        next();
    }
    else {
        res
            .status(401)
            .json({ err: "You need to be logged in to access this data" });
    }
};
