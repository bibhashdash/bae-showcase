import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {NewRide} from "@/app/(private)/[userId]/dashboard/newRide";
import {getUserProfile} from "@/app/lib/actions";

export default async function Rides () {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    const userProfile = await getUserProfile(data.user.id);
    return (
        <div>
            <h1 className="px-2 font-semibold text-2xl">Add a new ride</h1>

            <div className="px-2 py-2 h-full">
                <NewRide user={userProfile}/>
            </div>
        </div>
    )
}