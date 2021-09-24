import { Router } from "express";
// import { getItem } from "./controller";

import { getItemType } from "./controller";

const router = Router();

// router.get("/", getItem);
router.get("/", getItemType);

export default router;
