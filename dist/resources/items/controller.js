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
const cloudinary_1 = require("cloudinary");
// const cloudinary = require("cloudinary").v2;
// export const addItem = async (req: Request, res: Response) => {
//   const newItem = req.body;
//   console.log(newItem)
//   try {
//     const createdItem = await dbClient.item.create({
//       data: {
//         ...newItem,
//       },
//     });
//     res.json({ data: createdItem });
//   } catch (error) {
//     res.json({ error });
//   }
// export const getItem = async (req:Request, res:Response) => {
//   const newItem = req.body;
//   const brand = newItem.brand
//   const itemTypes = newItem.itemType
// for (const item of newItem.itemType) {
//   console.log(item)
// }
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = req.body;
    const imageFile = newItem.itemImages;
    // Upload file to Cloudinary
    cloudinary_1.v2.uploader
        .upload(imageFile, { tags: "express_sample" })
        .then(function (image) {
        console.log("** file uploaded to Cloudinary service");
        console.dir(image);
        imageFile.image = image;
        // Save photo with image metadata
        return imageFile.save();
    })
        .then(function () {
        console.log("** photo saved");
    })
        .finally(function () {
        res.render("photos/create_through_server", {
            photo: imageFile,
            upload: imageFile.image,
        });
    });
    let itemTypetotal = 0;
    for (const item of newItem.itemType) {
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
    for (const item of newItem.itemType) {
        const itemTypeIds = yield database_1.default.itemType.findMany({
            where: {
                name: item,
            },
        });
        itemIds.push(itemTypeIds[0].id);
        // console.log(itemTypeIds)
    }
    console.log(itemIds);
    // [ { id: 1, name: 'fashion', creditModifier: 0 } ]
    // [ { id: 4, name: 'mens', creditModifier: 0 } ]
    // [ { id: 2, name: 'shoes', creditModifier: 3 } ]
    let totalCredits = 0;
    totalCredits = itemTypetotal + totalBrandCredits;
    const brandId = brandCredits[0].id;
    const updatedItem = {
        userId: newItem.userId,
        credits: totalCredits,
        image: newItem.itemImages,
        title: newItem.title,
        description: newItem.description,
        brandId: brandId,
    };
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
    // console.dir(req.body);
    // try {
    //   const createdItem = await dbClient.item.create({
    //     data: {
    //       ...newItem,
    //     },
    //   });
    //   res.json({ data: createdItem });
    // } catch (error) {
    //   res.json({ error });
    // console.log(req.body);
    // console.log(req.files);
    // res.json({ message: "Successfully uploaded files" });
});
exports.addItem = addItem;
// export Item
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
