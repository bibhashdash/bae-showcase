"use client"
import {RideFormSchema, User} from "@/lib/utils";
import {getAllRides, updateRideAttendance} from "@/lib/supabase/api";
import {useEffect, useState} from "react";
import {RideDetailsSummaryCard} from "@/app/(private)/[userId]/dashboard/rideSummaryCard";

export const Feed = ({user, organisationId}: { user: User, organisationId: string }) => {
    const [allRides, setAllRides] = useState<Array<RideFormSchema>>([]);

    useEffect(() => {
        getAllRides().then(result => {
            setAllRides(result)
        });
    }, []);


    const handleAttendanceClick = (isAttending: boolean, rideId: string) => {
        updateRideAttendance(isAttending, user.organisationId, user.userId, rideId)
            .then(() => getAllRides().then(result => setAllRides(result)))
    }

    return (
        <div className="pt-2">
            {
                allRides.length > 0 && allRides.map((ride: RideFormSchema) =>
                    <RideDetailsSummaryCard
                        organisationId={organisationId}
                        key={ride?.id}
                        userId={user.userId}
                        onAttendanceClick={isAttending => handleAttendanceClick(isAttending, ride.id)}
                        ride={ride}
                    />
                )
            }
        </div>
    )
}