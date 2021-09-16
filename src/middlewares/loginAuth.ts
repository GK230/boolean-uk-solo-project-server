import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/authGenerator";

export default (req: Request | any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  let payload = null;

  if (token) {
    payload = validateToken(token);
  }

  if (payload) {
    //create new property and store payload in it
    req.currentUserId = (payload as any).id;
    //continue normal go through rutes
    next();
  } else {
    res
      .status(401)
      .json({ err: "You need to be logged in to access this data" });
  }
};
