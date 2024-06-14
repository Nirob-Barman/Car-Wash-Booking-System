import { Router } from "express";
import { BookingControllers } from "./booking.controller";
import { adminMiddleware, authenticate, userMiddleware } from "../../middlewares/authenticate";

const router = Router();

router.post(
    "/",
    authenticate, userMiddleware,
    BookingControllers.createBooking
);

router.get(
    "/",
    authenticate, adminMiddleware,
    BookingControllers.getAllBookings
);

router.get(
    "/my-bookings",
    authenticate, userMiddleware,
    BookingControllers.getUserBookings
);

export const BookingRoutes = router;
