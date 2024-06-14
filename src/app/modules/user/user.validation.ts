import { z } from "zod";

export const userNameValidationSchema = z.object({
    firstName: z.string().min(1),
    middleName: z.string().optional(),
    lastName: z.string().min(1),
});

export const userValidationSchema = z.object({
    name: userNameValidationSchema,
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().regex(/^\d{10}$/),
    role: z.enum(["admin", "user"]),
    address: z.string().min(1),
});
