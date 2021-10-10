import { Response, Request } from "express";
import dbClient from "../../utils/database";
import { User } from "@prisma/client";

export const uploadFiles = async (req: Request, res: Response) => {
  const newItem = req.body;

  if (req.files) {
    const img = (req as any).files[0].path;
    newItem.img = img;
    console.log("image", newItem);
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

  let totalCredits = 0;
  totalCredits = itemTypetotal + totalBrandCredits;

  const brandId = brandCredits[0].id;
  console.log("brandId", brandId);

  const updatedItem = {
    userId: newItem.userId,
    credits: totalCredits,
    image: newItem.img,
    title: newItem.title,
    description: newItem.description,
    brandId: brandId,
  };

  console.log("updatedItem", updatedItem);
  const mappedItemTypeIds = itemIds.map((id) => {
    return {
      id: id,
    };
  });

  try {
    const createdItem = await dbClient.item.create({
      data: {
        ...updatedItem,
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
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await dbClient.item.findMany();
    res.json({ data: items });
  } catch (error) {
    res.json({ error });
  }
};

export const getUserItems = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const userItems = await dbClient.item.findMany({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: userItems });
  } catch (error) {
    res.json({ error });
  }
};
