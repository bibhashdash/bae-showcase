import {Ride} from "@/app/(private)/[userId]/rides/[rideId]/ride";

export default async function RideDetails({params}: {params: Promise<{rideId: string}>}){
    const {rideId} = await params
    if (!rideId) return null;
    return (
        <Ride rideId={rideId} />
    )
}