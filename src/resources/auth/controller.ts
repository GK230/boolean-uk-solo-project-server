import { Request, Response } from "express";
import { User } from "@prisma/client";
import { findUserWithValidation } from "./service";
import { createToken } from "../../utils/authGenerator";

export const loginUser = async (req: Request, res: Response) => {
  //  Get user credentials
  const userCreds: User = req.body;

  try {
    // Check if credentials are valid
    const loggedUser = await findUserWithValidation(userCreds);
    // handle result

    // Create token, this will be the user Passport
    const token = createToken({
      id: loggedUser.id,
      role: loggedUser.role,
      username: loggedUser.username,
    });

    // This creates a cookie that can't be accessed by Javascript in the Frontend
    // httpOnly: true
    res.cookie("token", token, { httpOnly: true });

    res.json({ data: { username: loggedUser.username } });
  } catch (error) {
    res.status(401).json({ error });
  }
};

export async function logoutUser(req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ msg: "You've been succesfully logged out", data: null });
}
