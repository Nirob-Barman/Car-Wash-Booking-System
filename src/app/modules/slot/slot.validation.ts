import { z } from "zod";

export const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format",
    }),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
  }),
});
