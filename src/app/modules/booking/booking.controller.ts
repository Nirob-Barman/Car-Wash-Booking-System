import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";
import { BookingServices } from "./booking.service";
import { Service } from "../service/service.model";
import { Slot } from "../slot/slot.model";

const createBooking = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("Authenticated user ID: ", req.user._id);

    const { customer, serviceId, slotId } = req.body;

    if (customer !== req.user._id) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "User is not found to create booking",
      );
    }

    const isServiceExist = await Service.findById(serviceId);
    if (!isServiceExist) {
      throw new AppError(StatusCodes.NOT_FOUND, "Service not found");
    }

    const isSlotExist = await Slot.findById(slotId);
    if (!isSlotExist || isSlotExist.isBooked !== "available") {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Slot not found or not available",
      );
    }

    const bookingData = {
      ...req.body,
      customer: req.user._id,
      service: serviceId,
      slot: slotId,
    };

    const booking = await BookingServices.createBookServiceIntoDB(
      bookingData,
      req.user._id,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  },
);

const getAllBookings = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await BookingServices.getAllBookingsFromDB();

    if (bookings.length > 0) {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "All bookings retrieved successfully",
        data: bookings,
      });
    } else {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "No Data Found",
        data: [],
      });
    }
  },
);

const getUserBookings = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const bookings = await BookingServices.getUserBookingsFromDB(userId);
    if (bookings.length > 0) {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: bookings,
      });
    } else {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "No Data Found",
        data: [],
      });
    }
  },
);

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
};
