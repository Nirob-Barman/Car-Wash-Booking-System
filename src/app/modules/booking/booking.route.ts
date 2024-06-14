import { Router } from "express";
import { BookingControllers } from "./booking.controller";
import {
  adminMiddleware,
  authenticate,
  userMiddleware,
} from "../../middlewares/authenticate";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingValidationSchema } from "./booking.validation";

const router = Router();

router.post(
  "/",
  authenticate,
  userMiddleware,
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get(
  "/",
  authenticate,
  adminMiddleware,
  BookingControllers.getAllBookings,
);

router.get(
  "/my-bookings",
  authenticate,
  userMiddleware,
  BookingControllers.getUserBookings,
);

export const BookingRoutes = router;
