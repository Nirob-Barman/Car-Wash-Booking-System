import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";

const createBookServiceIntoDB = async (
  bookingData: Partial<TBooking>,
  userId: string,
) => {
  // Check if slot is available
  const slot = await Slot.findById(bookingData.slot);
  if (!slot || slot.isBooked !== "available") {
    throw new AppError(StatusCodes.BAD_REQUEST, "Slot is not available");
  }

  // console.log("Booking data before creation: ", bookingData);

  // Create booking
  const newBooking = await Booking.create({
    ...bookingData,
    customer: userId,
  });

  // Update slot status to booked
  slot.isBooked = "booked";
  await slot.save();

  return newBooking.populate("customer service slot");
};

const getAllBookingsFromDB = async () => {
  return await Booking.find().populate("customer service slot");
};

const getUserBookingsFromDB = async (userId: string) => {
  return await Booking.find({ customer: userId }).populate("service slot");
};

export const BookingServices = {
  createBookServiceIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};
