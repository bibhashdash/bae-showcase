"use client"
import {Bike, House, Settings, User} from "lucide-react";
import {usePathname} from "next/navigation";

export const TabbedMenu = ({user}: {user: any}) => {
const pathname = usePathname();
const issActive = (slug: string) => {
    return pathname.includes(slug)
}
    return (
        <div className="sticky bottom-0 z-10 flex h-16 items-center border-t border-t-border justify-between bg-background px-6">
            <div className="flex flex-col items-center gap-1 cursor-pointer">
                <House/>
                <p>Home</p>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
                <Bike />
                <p>Club</p>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
                <User />
                <p>Profile</p>
            </div>
            {
                user.app_metadata.role === 'admin'
                && <div className="flex flex-col items-center gap-1 cursor-pointer">
                    <Settings />
                    <p>Settings</p>
                </div>
            }
        </div>
    )
}