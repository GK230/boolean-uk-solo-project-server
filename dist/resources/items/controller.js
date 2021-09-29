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
exports.uploadFiles = void 0;
const database_1 = __importDefault(require("../../utils/database"));
function uploadFiles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newItem = req.body;
        if (req.files) {
            const img = req.files[0].path;
            newItem.img = img;
        }
        let itemTypetotal = 0;
        for (const item of newItem.items) {
            const itemTypeCredits = yield database_1.default.itemType.findMany({
                where: {
                    name: item,
                },
            });
            itemTypetotal = itemTypeCredits[0].creditModifier + itemTypetotal;
        }
        const brandCredits = yield database_1.default.brand.findMany({
            where: {
                name: newItem.brand,
            },
        });
        const totalBrandCredits = brandCredits[0].creditModifier;
        const itemIds = [];
        for (const item of newItem.items) {
            const itemTypeIds = yield database_1.default.itemType.findMany({
                where: {
                    name: item,
                },
            });
            itemIds.push(itemTypeIds[0].id);
        }
        console.log(itemIds);
        let totalCredits = 0;
        totalCredits = itemTypetotal + totalBrandCredits;
        const brandId = brandCredits[0].id;
        const updatedItem = {
            userId: newItem.userId,
            credits: totalCredits,
            image: newItem.img,
            title: newItem.title,
            description: newItem.description,
            // brandId: brandId,
        };
        // console.log(updatedItem.image)
        console.log(updatedItem);
        const mappedItemTypeIds = itemIds.map((id) => {
            return {
                id: id,
            };
        });
        console.log(mappedItemTypeIds);
        try {
            const createdItem = yield database_1.default.item.create({
                data: Object.assign({}, updatedItem),
            });
            console.log("createdItem", createdItem);
            const updated = yield database_1.default.item.update({
                where: {
                    id: createdItem.id,
                },
                data: {
                    itemTypes: {
                        connect: mappedItemTypeIds,
                    },
                },
            });
            console.log("updated", updated);
            res.json({ data: createdItem });
        }
        catch (error) {
            console.log(error);
            res.json({ error });
        }
    });
}
exports.uploadFiles = uploadFiles;
