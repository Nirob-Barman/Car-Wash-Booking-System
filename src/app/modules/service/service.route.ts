import express from "express";
import { ServiceControllers } from "./service.controller";
import { adminMiddleware, authenticate } from "../../middlewares/authenticate";
import { SlotController } from "../slot/slot.controller";

const router = express.Router();

router.post("/",
    authenticate, adminMiddleware,
    ServiceControllers.createService);

router.get("/:id",
    authenticate,
    ServiceControllers.getService);

router.get("/",
    authenticate,
    ServiceControllers.getAllServices);

router.put("/:id",
    authenticate, adminMiddleware,
    ServiceControllers.updateService);

router.delete("/:id",
    authenticate, adminMiddleware,
    ServiceControllers.deleteService);

router.post("/slots",
    authenticate, adminMiddleware,
    SlotController.createSlots);

export const ServiceRoutes = router;