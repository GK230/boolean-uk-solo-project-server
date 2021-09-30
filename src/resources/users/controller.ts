import { Request, Response } from "express";
import { createToken } from "../../utils/authGenerator";
// I'm importing from service my patched version of prisma model
import userClient from "./service";

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await userClient.findMany();

  res.json({ data: allUsers });
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  // This is my modified create version, with the password hashing!
  const savedUser = await userClient.createWithHash(newUser);

  const token = createToken({
    id: savedUser.id,
    username: savedUser.username,
  });

  // This creates a cookie that can't be accessed by Javascript in the Frontend
  // httpOnly: true
  res.cookie("token", token, { httpOnly: true });

  res.json({ data: { username: savedUser.username } });
};
