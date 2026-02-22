"use client"

import { useEffect, useState } from "react"
import { getOrganisation } from "@/lib/supabase/api"
import { Organisation } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export const Settings = ({ organisationId }: { organisationId: string }) => {
    const [settings, setSettings] = useState<Organisation | null>(null)

    useEffect(() => {
        getOrganisation(organisationId).then(setSettings)
    }, [organisationId])

    if (!settings) return null

    return (
        <div className="pt-2">
            <div className="flex flex-col gap-4 px-2 py-4">
                <div>
                    <p className="font-semibold">Name</p>
                    <p>{settings.name}</p>
                </div>
                <div>
                    <p className="font-semibold">Address</p>
                    <p>{settings.address}</p>
                </div>
                <div>
                    <p className="font-semibold">Email</p>
                    <p>{settings.email}</p>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-4 px-2 py-4">
                <div>
                    <p className="font-semibold">Ride Leaders</p>
                    <p>
                        {
                            settings.rideLeaders ? 
                            settings.rideLeaders.map(
                                (item, index) => <span key={index}>{item}</span>
                            )
                            : <i>You have no ride leaders set</i>
                        }
                    </p>
                </div>
                <div>
                    <p className="font-semibold">Ride Paces</p>
                    <p>
                        {
                            settings.ridePaces ? 
                            settings.ridePaces.map(
                                (item, index) => <span key={index}>{item}</span>
                            )
                            : <i>You have no ride paces set</i>
                        }
                    </p>
                </div>
                <div>
                    <p className="font-semibold">Ride Terrains</p>
                    <p>
                        {
                            settings.rideTerrains ? 
                            settings.rideTerrains.map(
                                (item, index) => <span key={index}>{item}</span>
                            )
                            : <i>You have no ride terrains set</i>
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
