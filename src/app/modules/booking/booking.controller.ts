import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createBookingValidationSchema } from "./booking.validation";
import AppError from "../../errors/AppError";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = createBookingValidationSchema.safeParse(req.body);

    if (error) {
        return next(new AppError(StatusCodes.BAD_REQUEST, error.message));
    }

    // console.log("Authenticated user ID: ", req.user._id);

    const bookingData = {
        ...req.body,
        customer: req.user._id // Ensure the customer field is set using the authenticated user's ID
    };

    const booking = await BookingServices.createBookServiceIntoDB(bookingData, req.user._id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Booking created successfully",
        data: booking
    });
});

const getAllBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await BookingServices.getAllBookingsFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All bookings retrieved successfully",
        data: bookings
    });
});

const getUserBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const bookings = await BookingServices.getUserBookingsFromDB(userId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: bookings
    });
});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getUserBookings
};
