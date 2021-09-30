import { Router } from "express";

// import { addItem } from "./controller";
// router.post("/upload_)", addItem);

import { uploadFiles } from "./controller";

const router = Router();


router.post("/", uploadFiles);

export default router;
