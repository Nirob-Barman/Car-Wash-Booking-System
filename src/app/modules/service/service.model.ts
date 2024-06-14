import { TService } from "./service.interface";
import { Schema, model } from "mongoose";

const ServiceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export const Service = model<TService>("Service", ServiceSchema);
