import { z } from "zod";
import { VehicleType } from "./booking.constants";

export const createBookingValidationSchema = z.object({
  body: z.object({
    customer: z.string(),
    service: z.string(),
    slot: z.string(),
    vehicleType: z.enum([...VehicleType] as [string, ...string[]]),
    vehicleBrand: z.string().min(1),
    vehicleModel: z.string().min(1),
    manufacturingYear: z.number().positive(),
    registrationPlate: z.string().min(1),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
