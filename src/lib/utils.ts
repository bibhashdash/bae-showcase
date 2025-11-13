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


// When I log in to work
// I have separate projects I am working on per my harvest
// each day I work on a todo list of tasks
// each task is related to a project (each project can be a tag?)
// thereby if I have a task that spans multiple projects, I can add multiple tags
// each task should consist of some standard columns/fields
// Name, git branch name, brief description
// each task also has a todo list of items - just strings will do with the usual mark as done etc CRUD ops

export interface Project {
    id: string,
    title: string,
    tasks?: Array<string>, // array of Task ids
    userId: string,
    isComplete: boolean,
    isActive: boolean,
}

export interface Task {
    id: string
    title: string
    description: string
    branchName?: string
    microTasks?: Array<string>, // array of related micro task ids
    isComplete: boolean,
    isActive: boolean,
    tags?: Array<string>, // array of project ids
    userId: string
}

export interface MicroTask {
    id: string
    title: string
    description: string,
    isComplete: boolean,
    isActive: boolean,
    taskId: string,
    userId: string
}

