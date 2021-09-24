import { Request, Response } from "express";
import dbClient from "../../utils/database";
import { addItem } from "../items/controller"

// export const getItem = async (req:Request, res:Response) => {
//   const newItem = req.body;
//   const brand = newItem.brand
//   const itemTypes = newItem.itemType


// const getItemTypes = await dbClient.itemType.findMany({
//   where: {

//   }
// })

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
