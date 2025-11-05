"use server";
import {LoginSchema, RegisterSchema} from "@/lib/utils";
import * as z from "zod";
import {createClient} from "@/lib/supabase/server";
import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'

export async function login (formData: unknown) {
    const supabase = await createClient()
    const result = LoginSchema.safeParse(formData);
    if (!result.success) {
        return z.treeifyError(result.error);
    }
    const { error, data } = await supabase.auth.signInWithPassword({email: result.data.email, password: result.data.password});
    if (error) {
        console.log(error);
        redirect('/error')
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

export async function logout () {
    const supabase = await createClient()
    const {error} = await supabase.auth.signOut()
    if (error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect("/login")
}

// export async function getAuthenticatedUser(): Promise<User | null> {
//     const cookieStore = cookies();
//     const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, cookieStore);
//
//     // This is the single source of truth for the authenticated user.
//     const { data: userData, error } = await supabase.auth.getUser();
//
//     if (error) {
//         console.error("Auth Error in server utility:", error.message);
//         return null;
//     }
//
//     return userData.user;
// }