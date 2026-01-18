"use client"
import dayjs from 'dayjs';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {RideFormSchema} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {ChevronRight, Navigation, PlayCircleIcon, Route, Ruler, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

interface RideSummaryProps {
    ride: RideFormSchema,
    onAttendanceClick: (isAttending: boolean) => void,
    userId: string,
    organisationId: string,
}


export const RideDetailsSummaryCard = ({ride, onAttendanceClick, userId, organisationId}: RideSummaryProps) => {
    return (
        <Card onClick={() => redirect(`/${organisationId}/rides/${ride.id}`)} className="rounded-none shadow-none">
            <div className="h-36 relative">
                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                     src="/ride-details-placeholder.png" alt="ride details placeholder"/>
                <div className="absolute top-0 left-2 bg-white rounded flex flex-col items-center py-2 px-4 shadow-md">
                    <p className="text-gray-400 font-semibold">{dayjs(ride.date).format("MMM")}</p>
                    <p className="text-2xl font-semibold">{dayjs(ride.date).format("DD")}</p>
                    <div className="flex gap-1 items-center">
                        <p className="font-semibold">{ride.time?.slice(0, 5)}</p>
                    </div>
                </div>
                <div className="absolute top-0 right-2">
                    <Badge className="font-semibold">{ride.pace}</Badge>
                </div>
            </div>
            <CardHeader>
                <CardTitle>
                    <p className="text-xl">{ride.title}</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-stretch mb-2">
                    <div className="flex gap-1 items-center text-gray-400 font-light w-full">
                        <PlayCircleIcon size={18}/>
                        <p>{ride.start}</p>
                    </div>
                    <div className="flex gap-1 items-center text-gray-400 font-light w-full">
                        <Navigation size={18}/>
                        <p>{ride.destination}</p>
                    </div>
                </div>
                <div className="flex items-center justify-stretch mb-2">
                    <div className="flex gap-1 items-center text-gray-400 font-light w-full">
                        <Ruler size={18}/>
                        <p>{ride.distance} miles</p>
                    </div>
                    <div className="flex gap-1 items-center text-gray-400 font-light w-full">
                        <Route size={18}/>
                        <a href={ride.routeUrl}>Route</a>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        {ride.attendanceList && ride.attendanceList.length > 0 ? (<p>{ride.attendanceList.length}</p>) :
                            <p className="text-gray-400">Be the first to join!</p>}
                    </div>
                    {
                        ride.attendanceList?.includes(userId)
                            ? <Button variant="secondary" onClick={() => onAttendanceClick(false)}><X /> Leave Ride</Button>
                            : <Button onClick={() => onAttendanceClick(true)}>Join Ride <ChevronRight/></Button>
                    }
                </div>
            </CardContent>

        </Card>
    )
}