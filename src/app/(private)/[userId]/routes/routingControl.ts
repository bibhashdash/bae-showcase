"use client"
import {useMap} from "react-leaflet";
import {useEffect, useRef} from "react";
import L from "leaflet";
import {eventTypeCheckCompleted} from "next/dist/telemetry/events";

export const RoutingControl = (
    {updateWaypointsAction, wayPoints, updateDistanceAction}: {updateWaypointsAction: (lat: number, lng: number) => void, wayPoints: Array<L.LatLng>, updateDistanceAction: (distance: number) => void }) => {
    const map = useMap();
    const routingControlRef = useRef<any>(null);
    useEffect(() => {

        if (!routingControlRef.current) {
            routingControlRef.current = (L as any).Routing.control({
                waypoints: wayPoints,
                routeWhileDragging: true,
                addWaypoints: true,
                lineOptions: {
                    styles: [{ color: "#6FA1EC", weight: 4 }]
                }
            }).addTo(map);
            routingControlRef.current.on("routesfound", (e: any) => {
                const route = e.routes[0];
                console.log(route.summary.totalDistance);
                updateDistanceAction(route.summary.totalDistance);
            })


            const onMapClick = (event: L.LeafletMouseEvent) => {
                updateWaypointsAction(event.latlng.lat, event.latlng.lng);
            };

            map.on("click", onMapClick)
            return () => {
                map.off("click", onMapClick);
                if (routingControlRef.current) {
                    map.removeControl(routingControlRef.current);
                    routingControlRef.current = null;
                }
            };
        }
    }, [map])

    useEffect(() => {
        if (routingControlRef.current && wayPoints.length > 0) {
            routingControlRef.current.setWaypoints(wayPoints);
            if (wayPoints.length >= 2) {
                routingControlRef.current.route();
            } else {
                updateDistanceAction(0)
            }

        }
    }, [wayPoints]);
    return null
}