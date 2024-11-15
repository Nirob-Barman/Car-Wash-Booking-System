import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { VehicleType } from "./booking.constants";

const BookingSchema = new Schema<TBooking>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.customer.role;
        delete ret.customer.password;
        delete ret.customer.createdAt;
        delete ret.customer.updatedAt;
        delete ret.customer.__v;

        delete ret.service.createdAt;
        delete ret.service.updatedAt;
        delete ret.service.__v;

        delete ret.slot.createdAt;
        delete ret.slot.updatedAt;
        delete ret.slot.__v;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const Booking = model<TBooking>("Booking", BookingSchema);
