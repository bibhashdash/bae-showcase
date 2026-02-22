"use client"

import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import {useEffect, useState} from "react";
import {RoutingControl} from "@/app/(private)/[userId]/routes/routingControl";
import {Button} from "@/components/ui/button";

function Map() {
    const [wayPoints, setWayPoints] = useState<L.LatLng[]>([]);
    const [distance, setDistance] = useState<number>(0);

    return (
        <div className="w-full h-full grid grid-rows-12">
            <div className="w-full row-span-9">
                <MapContainer className="w-full h-full" center={[51.505, -0.09]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RoutingControl updateDistanceAction={d => setDistance(d)} wayPoints={wayPoints}
                                    updateWaypointsAction={(lat, lng) => {
                                        setWayPoints(prevState => [...prevState, new L.LatLng(lat, lng)]);
                                    }}/>
                </MapContainer>
            </div>
            <div className="row-span-3 mt-2 flex flex-col">
                <div className="flex justify-between">
                    <p className="text-2xl">{Number.parseFloat(String(distance / 1609)).toFixed(2)} miles</p>
                    {/*<p className="text-2xl">{Number.parseFloat(String(distance / 1609)).toFixed(2)} miles</p>*/}
                </div>
                <div className="flex justify-between mt-2">
                    <Button onClick={() => {
                        const newArray = wayPoints.toSpliced(wayPoints.length - 1, 1)
                        setWayPoints(newArray);
                    }} disabled={wayPoints.length === 0}>Undo</Button>
                    <div className="flex gap-2">
                        <Button disabled={wayPoints.length < 2}>Save Route</Button>
                        <Button>Cancel</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Map;