import {getRide} from "@/lib/supabase/api";
import {Ride} from "@/app/(private)/[userId]/rides/[rideId]/ride";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function RideDetails({params}: {params: Promise<{rideId: string}>}){
    const {rideId} = await params
    if (!rideId) return null;
    return (
        <Ride rideId={rideId} />
    )
}