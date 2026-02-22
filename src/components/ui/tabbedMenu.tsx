"use client"
import { Bike, House, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link'

export const TabbedMenu = ({ organisationId, role }: { organisationId: string, role: string }) => {
    const pathname = usePathname();
    const isActive = (slug: string) => {
        return pathname.includes(slug)
    }
    return (
        <div className="sticky bottom-0 z-10 flex items-center border-t border-t-border justify-between bg-background px-6 py-4">
            <Link href={`/${organisationId}/dashboard`}>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <House fill={isActive("dashboard") ? "black" : "none"} />
                    <p>Home</p>
                </div>
            </Link>
            <Link href={`/${organisationId}/club`}>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Bike fill={isActive("club") ? "black" : "none"} />
                    <p>Club</p>
                </div>
            </Link>
            <Link href={`/${organisationId}/profile`}>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <User fill={isActive("profile") ? "black" : "none"} />
                    <p>Profile</p>
                </div>
            </Link>
            {
                role === 'admin'
                && <Link href={`/${organisationId}/settings`}>
                    <div className="flex flex-col items-center gap-1 cursor-pointer">
                        <Settings fill={isActive("settings") ? "black" : "none"} />
                        <p>Settings</p>
                    </div>
                </Link>
            }
        </div>
    )
}