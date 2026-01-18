"use client"
import {useEffect, useState} from "react";
import {getRide} from "@/lib/supabase/api";
import {RideFormSchema} from "@/lib/utils";

export const Ride = ({rideId}:{rideId: string}) => {
    const [ride, setRide] = useState<RideFormSchema>()
    useEffect(() => {
        getRide(rideId).then(result => setRide(result));
    }, [])
    return (
        <div className="">{ride?.title}</div>
    )
}