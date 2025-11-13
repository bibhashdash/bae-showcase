import * as z from 'zod';
import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {getBindingIdentifiers} from "@babel/types";
import keys = getBindingIdentifiers.keys;

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

export const JournalEntrySchema = z.object({
    title: z.string().min(1),
    date: z.iso.datetime(),
    tags: z.array(z.string()).default(["unknown"]).optional(),
    text: z.string().min(1),
})

export interface ProductType {
    name: keyof typeof costs
    quantity: number
}

const costs = {
    "coke": 2,
    "pepsi": 2.50,
    "fanta": 3,
}

type item = keyof typeof costs
const gbpString = (cost: number) => (`£${cost.toFixed(2)}`)

const receiptStringBuilder = (item: ProductType) => {
    const costPerItem = costs[item.name]
    return `${item.name}. ${item.quantity} @ ${gbpString(costPerItem)} = ${gbpString(costPerItem * item.quantity)}`
}

export class Basket {
    private listOfItems: Array<ProductType> = [];
    private basketTotalValue: number = 0.00;

    get size(): number {
        return this.listOfItems.length
    }

    // quantity(item: item): number {
    //     return this.listOfItems.filter(element => item === element).length
    // }

    constructor() {

    }

    add(param: item) {
        const temp = this.listOfItems.find(e => e.name === param)
        if (temp) {
            temp.quantity ++
        } else {
            this.listOfItems.push({
                name: param,
                quantity: 1,
            })
        }
        this.basketTotalValue += costs[param]
    }

    generateReceipt() {
        return this.listOfItems.reduce((acc, item, index) => {
            return acc + `${index + 1}) ${receiptStringBuilder(item)}\n`
        }, "") + `Total: ${gbpString(this.basketTotalValue)}`;
    }
}