"use client"
import {Bike, House, Settings, User} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from 'next/link'

export const TabbedMenu = ({user}: {user: any}) => {
const pathname = usePathname();
const issActive = (slug: string) => {
    return pathname.includes(slug)
}
    return (
        <div className="sticky bottom-0 z-10 flex items-center border-t border-t-border justify-between bg-background px-6 py-4">
            <Link href={`/${user.app_metadata.organisation_id}/dashboard`}>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <House/>
                    <p>Home</p>
                </div>
            </Link>
            <Link href={`/${user.app_metadata.organisation_id}/dashboard`}>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Bike/>
                    <p>Club</p>
                </div>
            </Link>
            <Link href={`/${user.app_metadata.organisation_id}/dashboard`}>
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <User/>
                    <p>Profile</p>
                </div>
            </Link>
            {
                user.app_metadata.role === 'admin'
                && <Link href={`/${user.app_metadata.organisation_id}/dashboard`}>
                    <div className="flex flex-col items-center gap-1 cursor-pointer">
                        <Settings/>
                        <p>Settings</p>
                    </div>
                </Link>
            }
        </div>
    )
}