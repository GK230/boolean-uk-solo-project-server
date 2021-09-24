import { Response, Request } from "express";
import dbClient from "../../utils/database";

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


export const addItem = async (req:Request, res:Response) => {
  const newItem = req.body;
  const brand = newItem.brand
  console.log(newItem)

  for (const item of newItem.itemType) {
    // console.log(item)
  }

  return newItem


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
}

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

