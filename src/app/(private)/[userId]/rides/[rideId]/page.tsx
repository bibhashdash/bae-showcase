import {Ride} from "@/app/(private)/[userId]/rides/[rideId]/ride";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {getUserProfile} from "@/app/lib/actions";

export default async function RideDetails({params}: {params: Promise<{rideId: string}>}){
    const {rideId} = await params
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    const userProfile = await getUserProfile(data.user.id);
    if (!rideId) return null;
    return (
        <Ride rideId={rideId} user={userProfile} />
    )
}