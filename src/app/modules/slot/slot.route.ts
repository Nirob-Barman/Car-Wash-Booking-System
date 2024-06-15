import express from "express";
import { SlotController } from "./slot.controller";

const router = express.Router();

// router.post("/slots",
//     authenticate, adminMiddleware,
//     SlotController.createSlots);

router.get("/availability", SlotController.getAvailableSlots);

export const SlotRoutes = router;
