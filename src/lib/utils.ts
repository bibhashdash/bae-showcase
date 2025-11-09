import * as z from 'zod';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const User = z.object({
    userId: z.string(),
    username: z.string().min(1, {error: "Cannot be blank"}),
    bio: z.string(),
    fullName: z.string({error: "name cannot be blank"}),
})
export interface Error {
    isError: boolean,
    errorMessage: string,
}
export const LoginSchema = z.object({
    email: z.email({error: "Invalid email format"}),
    password: z.string().refine((val) =>
            /[A-Za-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val),
        { error: "Password must be at least 8 characters, include a letter, a number, and a special character" }
    ),
})

export const RegisterSchema = z.object({
    email: z.email({error: "Invalid email format"}),
    password: z.string().min(8).refine((val) =>
            /[A-Za-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val),
        { error: "Password must be at least 8 characters, include a letter, a number, and a special character" }
    ),
    confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
    error: "Passwords do not match", path: ["confirm"]
})

export const JournalEntrySchema = z.object({
    title: z.string().min(1),
    date: z.iso.datetime(),
    tags: z.array(z.string()).default(["unknown"]).optional(),
    text: z.string().min(1),
})