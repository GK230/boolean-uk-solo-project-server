import { Router } from "express";
// import { getItem } from "./controller";


import { addItem } from "./controller";

const router = Router();

router.post("/", addItem);

export default router;
