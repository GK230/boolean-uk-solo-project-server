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
exports.addItem = void 0;
const database_1 = __importDefault(require("../../utils/database"));
// const cloudinary = require("cloudinary").v2;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = req.body;
    console.log(newItem);
    try {
        const createdItem = yield database_1.default.item.create({
            data: Object.assign({}, newItem),
        });
        res.json({ data: createdItem });
    }
    catch (error) {
        res.json({ error });
    }
    //   parser.single("image"), (req, res) => {
    //     console.log(req.file) // to see what is returned to you
    //     const image = {};
    //     image.url = req.file.url;
    //     image.id = req.file.public_id;
    //     Image.create(image) // save image information in database
    //       .then(newImage => res.json(newImage))
    //       .catch(err => console.log(err));
    //   }
    //   // image was not uploaded, returning to edit form
    //   if (!req.body.image_id) {
    //     if (req.body.type === "direct") {
    //       res.redirect("/profile");
    //     } else {
    //       res.redirect("/swap");
    //     }
    //     return;
    //   }
    //   let image = new cloudinary.PreloadedFile(req.body.image_id);
    //   // check that image resolved from image_id is valid
    //   if (image.is_valid()) {
    //     item.image = image.toJSON();
    //     console.dir(item.image);
    //   }
    //   item
    //     .save()
    //     .then(function () {
    //       console.log("** photo saved");
    //     })
    //     .catch(function (err) {
    //       result.error = err;
    //       console.log("** error while uploading file");
    //       console.dir(err);
    //     })
    //     .finally(function () {
    //       res.render("photos/create_direct", { item: item, upload: item.image });
    //     });
});
exports.addItem = addItem;
