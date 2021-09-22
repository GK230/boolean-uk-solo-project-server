import { Router } from "express";

import { addItem } from "./controller";

const router = Router();

router.post("/", addItem);

export default router;
