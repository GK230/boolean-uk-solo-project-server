import { Router } from "express";

// import { addItem } from "./controller";
// router.post("/upload_)", addItem);

import { uploadFiles } from "./controller";
import { getUserItems } from "./controller";

const router = Router();


router.post("/", uploadFiles);
router.get("/:id", getUserItems)

export default router;
