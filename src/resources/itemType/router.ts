import { Router } from "express";

import { getItemType } from "./controller";

const router = Router();

router.get("/", getItemType);

export default router;
