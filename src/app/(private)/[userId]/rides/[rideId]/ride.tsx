"use client"
import {useEffect, useState} from "react";
import {getAllRides, getRide, updateRideAttendance} from "@/lib/supabase/api";
import {RideFormSchema, User} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ChevronRight, X} from "lucide-react";

export const Ride = ({rideId, user}:{rideId: string, user: User}) => {
    const [ride, setRide] = useState<RideFormSchema>()
    useEffect(() => {
        getRide(rideId).then(result => setRide(result));
    }, [])
    const handleAttendanceClick = (isAttending: boolean) => {
        updateRideAttendance(isAttending, user.organisationId, user.userId, rideId)
            .then(() => getRide(rideId).then(result => setRide(result)))
    }
    return (
        <div className="h-full p-2">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-2xl">{ride?.title}</p>
                {
                    ride && ride.attendanceList?.includes(user.userId)
                        ? <Button variant="secondary" onClick={() => handleAttendanceClick(false)}><X /> Leave Ride</Button>
                        : <Button onClick={() => handleAttendanceClick(true)}>Join Ride <ChevronRight/></Button>
                }
            </div>
            <div className="h-64 relative">
                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                     src="/ride-details-placeholder.png" alt="ride details placeholder"
                />
            </div>
            <div>

            </div>

        </div>
    )
}