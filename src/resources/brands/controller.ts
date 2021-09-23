import { Request, Response } from "express";
import dbClient from "../../utils/database";

export const getBrand = async (req: Request, res: Response) => {

    const name = req.params.name
    try {
      const brand = await dbClient.brand.findUnique({
        where: {
          name: name,
        },
      });
      res.json({ data: brand });
    } catch (error) {
      res.json({ error });
    }
  };