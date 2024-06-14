import { z } from "zod";

export const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string().min(1),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
  }),
});
