import { Response, Request } from "express";
import dbClient from "../../utils/database";
import path from 'path'
import fs from "fs"



export async function uploadFiles(req: Request, res: Response) {
  const newItem = req.body;

  if (req.files) {

    const img = (req as any).files[0].path;
    newItem.img = img

  }

  let itemTypetotal = 0;
  for (const item of newItem.items) {
    const itemTypeCredits = await dbClient.itemType.findMany({
      where: {
        name: item,
      },
    });
    itemTypetotal = itemTypeCredits[0].creditModifier + itemTypetotal;
  }

  const brandCredits = await dbClient.brand.findMany({
    where: {
      name: newItem.brand,
    },
  });
  const totalBrandCredits = brandCredits[0].creditModifier;

  const itemIds = [];
  for (const item of newItem.items) {
    const itemTypeIds = await dbClient.itemType.findMany({
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
    const createdItem = await dbClient.item.create({
      data: {
        ...updatedItem,
        // itemTypes: {
        //   connect: mappedItemTypeIds,
        // },
      },
    });
    console.log("createdItem", createdItem);
    const updated = await dbClient.item.update({
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
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
