import {  z } from 'zod';

const nameSchema = z.object({
    firstName: z.string().min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    lastName: z.string(),
})

const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
})

const OrderSchema = z.object({
    productName: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
  });

export const userValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string().max(20),
    fullName: nameSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()).nonempty(),
    address: addressSchema,
    orders: z.array(OrderSchema).optional()
})