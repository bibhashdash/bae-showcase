import * as z from 'zod';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const loginSchema = z.object({
    email: z.email({error: "Invalid email format"}),
    password: z.string().refine((val) =>
            /[A-Za-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val),
        { error: "Password must include a letter, a number, and a special character" }
    ),
})

const passwordSchema = z.object({
    password: z.string().min(8, { error: "Password must be at least 8 characters" }).refine((val) =>
            /[A-Za-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val),
        { error: "Password must include a letter, a number, and a special character", path: ["confirm"] }
    ),
    confirm: z.string().min(8, { error: "Password must be at least 8 characters" }).refine((val) =>
            /[A-Za-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val),
        { error: "Password must include a letter, a number, and a special character", path: ["confirm"] }
    ),
}).refine((data) => data.password === data.confirm, {
    error: "Passwords do not match",
    path: ["confirm"],
});


export const registerSchema = z.object({
    email: z.email(),
    ...passwordSchema.shape,
})

export const journalEntrySchema = z.object({
    title: z.string().min(1),
    date: z.iso.datetime(),
    tags: z.array(z.string()).default(["unknown"]).optional(),
    text: z.string().min(1),
})