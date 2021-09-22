import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const JWT_SECRET = process.env.JWT as string;

export function createToken(payload: jwt.JwtPayload) {
  console.log("createToken", payload)
  return jwt.sign(payload, JWT_SECRET);
}

export function validateToken(token: string) {
  console.log("validateToken", token)
  return jwt.verify(token, JWT_SECRET);
}
