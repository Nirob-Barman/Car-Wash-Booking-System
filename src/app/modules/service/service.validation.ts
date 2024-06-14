import { z } from "zod";

export const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive(),
    duration: z.number().positive(),
    isDeleted: z.boolean(),
  }),
});

export const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    duration: z.number().positive().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
