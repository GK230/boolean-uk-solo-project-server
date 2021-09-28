import { Request, Response } from "express";
import userClient from "./service";

export const getAllUsers = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await userClient.findMany();
    res.json({ data: user });
  } catch (error) {
    res.json({ error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await userClient.findUnique({
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
  } catch (error) {
    res.json({ error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  newUser.totalCredits = 0;
  try {
    const savedUser = await userClient.createWithHash(newUser);
    res.json({ data: { username: savedUser.username } });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }

  // const token = createToken({
  //   id: savedUser.id,
  //   username: savedUser.username,
  // });

  // // This creates a cookie that can't be accessed by Javascript in the Frontend
  // // httpOnly: true
  // res.cookie("token", token, { httpOnly: true });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updateInfo = req.body;

  try {
    const existUser = await userClient.findUnique({
      where: {
        id,
      },
    });
    const updated = await userClient.update({
      where: {
        id,
      },
      data: {
        ...existUser,
        ...updateInfo,
      },
    });
    res.json({ data: updated });
  } catch (error) {
    res.json({ error: `ID ${id} doesn't exict` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const deleted = await userClient.delete({
      where: {
        id,
      },
    });
    res.json({ data: deleted });
  } catch (error) {
    res.json({ error });
  }
};