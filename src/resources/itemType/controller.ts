import { Request, Response } from "express";
import dbClient from "../../utils/database";

export const getItemType = async (req: Request, res: Response) => {
  const name = req.params.name;
  console.log("getItemType", name);
  try {
    const itemType = await dbClient.itemType.findUnique({
      where: {
        name: name,
      },
    });
    res.json({ data: itemType });
  } catch (error) {
    res.json({ error });
  }
};
