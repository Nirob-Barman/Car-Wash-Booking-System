import express from "express";
import { SlotController } from "./slot.controller"; // Assuming you have an auth middleware for checking admin
import { authenticate } from "../../middlewares/authenticate";
// import { adminMiddleware, authenticate } from "../../middlewares/authenticate";

const router = express.Router();

// router.post("/slots",
//     authenticate, adminMiddleware,
//     SlotController.createSlots);

router.get("/availability", authenticate, SlotController.getAvailableSlots);

export const SlotRoutes = router;
