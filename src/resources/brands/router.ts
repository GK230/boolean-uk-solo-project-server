import { Router } from "express";

import { getBrand } from "./controller";

const router = Router();

router.get("/", getBrand);

export default router;
