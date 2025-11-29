"use server";
import {LoginSchema, RegisterSchema, Task, User} from "@/lib/utils";
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

export const getUserProfile = async(id: string): Promise<User> => {
    const supabase = await createClient();

    try {
        const { data, error, status } = await supabase
            .from('profiles')
            .select(`userId: user_id, fullName: full_name, username: username, bio: bio, userRole: user_role`)
            .eq('user_id', id)
            .single()
        if (error && status !== 406) {
            console.log(error);
            throw error;
        }
        if (!data) {
            throw new Error('User not found.');
        }
        return data
    } catch (error) {
        throw error;
    }
}

export const getAllUserTasks = async(userId: string): Promise<Task[]> => {
    const supabase = await createClient();
    try {
        const { data, error, status } = await supabase
            .from('tasks')
            .select(`id: id, userId: user_id, title: title, description: description, assignedTo: assigned_to, isComplete: is_complete, deadline: deadline`)
            .order('created_at', { ascending: false })
            .eq('user_id', userId)
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error fetching tasks');
        }
        if (!data) {
            throw new Error('Error fetching tasks');
        }
        return data
    } catch (err) {
        throw err;
    }
}