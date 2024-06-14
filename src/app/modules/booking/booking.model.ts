import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { VehicleType } from "./booking.constants";

const BookingSchema = new Schema<TBooking>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  slot: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
  vehicleType: {
    type: String,
    enum: {
      values: VehicleType,
      message: "{VALUE} is not a valid vehicle type",
    },
    required: true,
  },
  vehicleBrand: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  manufacturingYear: { type: Number, required: true },
  registrationPlate: { type: String, required: true, unique: true },
});

export const Booking = model<TBooking>("Booking", BookingSchema);
