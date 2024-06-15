import express from "express";
import { ServiceControllers } from "./service.controller";
import { adminMiddleware, authenticate } from "../../middlewares/authenticate";
import { SlotController } from "../slot/slot.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createServiceValidationSchema,
  updateServiceValidationSchema,
} from "./service.validation";
import { createSlotValidationSchema } from "../slot/slot.validation";

const router = express.Router();

router.post(
  "/",
  authenticate,
  adminMiddleware,
  validateRequest(createServiceValidationSchema),
  ServiceControllers.createService,
);

router.get("/:id", authenticate, ServiceControllers.getService);

router.get("/", authenticate, ServiceControllers.getAllServices);

router.put(
  "/:id",
  authenticate,
  adminMiddleware,
  validateRequest(updateServiceValidationSchema),
  ServiceControllers.updateService,
);

router.delete(
  "/:id",
  authenticate,
  adminMiddleware,
  ServiceControllers.deleteService,
);

router.post(
  "/slots",
  authenticate,
  adminMiddleware,
  validateRequest(createSlotValidationSchema),
  SlotController.createSlots,
);

export const ServiceRoutes = router;
