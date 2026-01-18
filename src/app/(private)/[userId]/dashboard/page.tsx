import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {getUserProfile} from "@/app/lib/actions";
import {Feed} from "@/app/(private)/[userId]/dashboard/feed";

export default async function Dashboard() {
    const supabase = await createClient()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/login')
    }



    const userProfile = await getUserProfile(userData.user.id)
    return <div className="">
        <h1 className="px-2 font-semibold text-2xl">Upcoming Rides</h1>
        <Feed user={userProfile} organisationId={userData.user.app_metadata.organisation_id} />
    </div>
}