"use client"
import {RideFormSchema, User} from "@/lib/utils";
import {getAllRides} from "@/lib/supabase/api";
import {useEffect, useState} from "react";
import {RideDetailsSummaryCard} from "@/app/(private)/[userId]/dashboard/rideSummaryCard";

export const Feed = ({user}: {user: User}) => {
    const [allRides, setAllRides] = useState<Array<RideFormSchema>>([]);

    useEffect(() => {
        getAllRides(user.organisationId).then(result => setAllRides(result));
    }, []);
    return (
        <div className="pt-2">
            {
                allRides
                    .map((ride: RideFormSchema) => <RideDetailsSummaryCard key={ride.id} ride={ride}/>
                    )
            }
        </div>
    )
}