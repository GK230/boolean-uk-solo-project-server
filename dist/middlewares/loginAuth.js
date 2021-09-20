"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authGenerator_1 = require("../utils/authGenerator");
exports.default = (req, res, next) => {
    const token = req.cookies.token;
    let payload = null;
    if (token) {
        payload = (0, authGenerator_1.validateToken)(token);
    }
    if (payload) {
        //create new property and store payload in it
        req.currentUserId = payload.id;
        //continue normal go through rutes
        next();
    }
    else {
        res
            .status(401)
            .json({ err: "You need to be logged in to access this data" });
    }
};
