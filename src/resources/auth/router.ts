import { Router } from "express";
import { createUser } from "../users/controller";
import { loginUser, logoutUser } from "./controller";

const router = Router();

// login

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.post("/signup", createUser);

// logout??

export default router;
