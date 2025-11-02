"use server";
import {LoginSchema} from "@/lib/utils";
import * as z from "zod";

export async function login (formData: unknown) {
    console.log("hit the login function");
    const result = LoginSchema.safeParse(formData);
    console.log(result);
    if (!result.success) {
        return z.treeifyError(result.error);
    }

    const { email, password } = result.data;
    console.log("login", email, password);
    return 'Login process completed on the backend.';
//     check against supabase database
}