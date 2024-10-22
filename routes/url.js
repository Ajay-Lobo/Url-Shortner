import express from "express";
import { shortUrl, getUrl, getStats } from "../controllers/url.js";

const router = express.Router();

router.post("/", shortUrl).get("/:id", getUrl).get("/:id/stats", getStats);

export default router;
