import { Router } from "express";
import { createUser } from "../users/controller";
import { loginUser, logoutUser } from "./controller";

const router = Router();

// login

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/signup").post(createUser);

// logout??

export default router;
