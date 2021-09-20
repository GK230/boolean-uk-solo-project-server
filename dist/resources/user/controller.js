"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const service_1 = __importDefault(require("./service"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield service_1.default.findMany();
        res.json({ data: user });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const user = yield service_1.default.findUnique({
            where: {
                id,
            },
            include: {
                purchases: true,
                reviews: true,
                items: true,
            },
        });
        res.json({ data: user });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    try {
        const savedUser = yield service_1.default.createWithHash(newUser);
        res.json({ data: savedUser });
    }
    catch (error) {
        console.error(error);
        res.json({ error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updateInfo = req.body;
    try {
        const existUser = yield service_1.default.findUnique({
            where: {
                id,
            },
        });
        const updated = yield service_1.default.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign({}, existUser), updateInfo),
        });
        res.json({ data: updated });
    }
    catch (error) {
        res.json({ error: `ID ${id} doesn't exict` });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const deleted = yield service_1.default.delete({
            where: {
                id,
            },
        });
        res.json({ data: deleted });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteUser = deleteUser;
