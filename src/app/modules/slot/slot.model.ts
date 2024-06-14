import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const SlotSchema = new Schema<TSlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

export const Slot = model<TSlot>("Slot", SlotSchema);
