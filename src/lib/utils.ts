import * as z from 'zod';
import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface User {
    id: string,
    userId: string,
    username: string,
    bio: string,
    fullName: string,
    userRole: number,
    organisationId: string,
    role: string,
}

export interface Error {
    isError: boolean,
    errorMessage: string,
}

export const LoginSchema = z.object({
    email: z.email({error: "Invalid email format"}),
    password: z.string().refine((val) =>
            /[A-Za-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val),
        {error: "Password must be at least 8 characters, include a letter, a number, and a special character"}
    ),
})

export const RegisterSchema = z.object({
    email: z.email({error: "Invalid email format"}),
    password: z.string().min(8).refine((val) =>
            /[A-Za-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val),
        {error: "Password must be at least 8 characters, include a letter, a number, and a special character"}
    ),
    confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
    error: "Passwords do not match", path: ["confirm"]
})

export interface RideFormSchema {
    id: string,
    title: string,
    date: string,
    time: string,
    start: string,
    destination: string,
    // routeUrl is for things like rideWithGps. eventually we want user to input the link and for us to be able to show a preview?
    routeUrl: string,
    description: string,

    // attendance list is an array of userIds who have clicked going
    attendanceList: Array<string>,
    pace: string,
    distance: number,
    isOfficialClubRide: boolean,
    leader: string,
    organisationId: string,
    rideType: string,
}

// export const RidesArraySchema = z.array(RideFormSchema);


export interface Task {
    id: string
    title: string
    description: string
    isComplete: boolean,
    userId: string,
    deadline?: Date,
    assignedTo?: Array<string>,
    value?: number
}

