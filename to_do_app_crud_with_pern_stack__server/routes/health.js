import express from "express";

import { healthCheckHandler } from "../controllers/healthController.js";

const router = express.Router();

router.get("/", healthCheckHandler);

export default router;
