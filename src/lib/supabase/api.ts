import {User} from "@/lib/utils";
import {createClient} from "@/lib/supabase/client";

export const getUserProfile = async(id: string): Promise<User | undefined> => {
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
        if (data) {
            return data
        }
    } catch (error) {
        throw error;
    }
}