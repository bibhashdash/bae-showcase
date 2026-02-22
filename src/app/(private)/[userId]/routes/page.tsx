import Map from "@/app/(private)/[userId]/routes/map";
import {useMemo} from "react";
import dynamic from "next/dynamic";
import {MapComponent} from "@/app/(private)/[userId]/routes/mapContainer";

export default async function Routes() {

    return (
        <div>
            <h1 className="px-2 font-semibold text-2xl">Create route</h1>

            <div className="px-2 py-2 h-[80vh]">
                <div className="h-full">
                    <MapComponent />
                </div>
            </div>
        </div>
    )
}