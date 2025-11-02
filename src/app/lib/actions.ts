"use server";
import {LoginSchema, RegisterSchema} from "@/lib/utils";
import * as z from "zod";
import {createClient} from "@/lib/supabase/server";
import { redirect } from 'next/navigation'

import { revalidatePath } from 'next/cache'

import { v4 as uuidv4 } from 'uuid';

export async function login (formData: unknown) {
    const supabase = await createClient()
    const result = LoginSchema.safeParse(formData);
    if (!result.success) {
        return z.treeifyError(result.error);
    }
    const { error, data } = await supabase.auth.signInWithPassword({email: result.data.email, password: result.data.password});
    // const { email, password } = result.data;
    if (error) {
        console.log(error);
        redirect('/error')
    }
    else {
        if (data) console.log(data)
    }
    revalidatePath('/', 'layout')
    redirect(`/${data.user?.id}/dashboard`)
}

export async function signup(formData: unknown) {
    const supabase = await createClient()
    const result = RegisterSchema.safeParse(formData);
    if (!result.success) {
        return z.treeifyError(result.error);
    }
    const { error, data } = await supabase.auth.signUp(result.data);

    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect(`/${data.user?.id}/dashboard`)
}