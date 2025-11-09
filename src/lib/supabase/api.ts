import {User} from "@/lib/utils";
import {createClient} from "@/lib/supabase/client";
import * as zod from "zod";
import {error} from "next/dist/build/output/log";
export const getUserProfile = async(id: string): Promise<zod.infer<typeof User>> => {
    const supabase = createClient();

    try {
        const { data, error, status } = await supabase
            .from('profiles')
            .select(`userId: user_id, fullName: full_name, username: username, bio: bio`)
            .eq('user_id', id)
            .single()
        if (error && status !== 406) {
            console.log(error);
            throw error;
        }
        if (!data) {
            throw new Error('User not found.');
        }
        return User.parse(data)
    } catch (error) {
        throw error;
    }
}

export const updateUserProfile = async(user: zod.infer<typeof User>): Promise<zod.infer<typeof User>> => {
    const supabase = createClient();
    try {
        const { data, error, status } = await supabase
            .from('profiles')
            // need to use a utility function to map camelCase into snake_case for table columns
            .update()
            .eq('user_id', user.userId)
            .select()
        if (error && status !== 406) {
            console.log(error);
            throw error;
        }
        if (!data) {
            throw new Error('Error updating user profile.');
        }
        return User.parse(data)
    } catch (err) {
        throw error;
    }
}