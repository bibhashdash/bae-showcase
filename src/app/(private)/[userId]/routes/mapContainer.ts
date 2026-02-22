"use client"
import dynamic from "next/dynamic";

const MapComponent = dynamic(
    () => import("./map"),
    { ssr: false}
)

export {MapComponent};