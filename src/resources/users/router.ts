import { Router } from "express";
import { getUserItems } from "../items/controller";
import { getAllUsers } from "./controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/", getUserItems);

export default router;
