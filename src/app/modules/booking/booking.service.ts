import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";
import { Service } from "../service/service.model";

const createBookServiceIntoDB = async (
  bookingData: Partial<TBooking>,
  userId: string,
) => {
  const isServiceExist = await Service.findById(bookingData.service);
  if (!isServiceExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Service not found");
  }

  const isSlotExist = await Slot.findById(bookingData.slot);
  if (!isSlotExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Slot not found");
  }

  if (isSlotExist.isBooked !== "available") {
    throw new AppError(StatusCodes.BAD_REQUEST, "Slot is not available");
  }

  // Create booking
  const newBooking = await Booking.create({
    ...bookingData,
    customer: userId,
  });

  // Update slot status to booked
  isSlotExist.isBooked = "booked";
  await isSlotExist.save();

  return newBooking.populate("customer service slot");
};

const getAllBookingsFromDB = async () => {
  return await Booking.find().populate("customer service slot");
};

const getUserBookingsFromDB = async (userId: string) => {
  const bookings = await Booking.find({ customer: userId })
    .populate({
      path: "service",
      select: "_id name description price duration isDeleted",
    })
    .populate({
      path: "slot",
      select: "_id service date startTime endTime isBooked",
    });

  return bookings.map((booking) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customer, ...cleanedBooking } = booking.toObject();
    return cleanedBooking;
  });
};

export const BookingServices = {
  createBookServiceIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};
