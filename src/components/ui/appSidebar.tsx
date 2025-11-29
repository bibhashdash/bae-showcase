"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {Avatar, AvatarFallback,} from "@/components/ui/avatar"

import {ArrowRightLeft, ClipboardList, Home, SettingsIcon, Sticker, Trophy, UserIcon} from "lucide-react";
import Link from "next/link";
import {User} from "@/lib/utils";

export const AppSidebar = ({user}: { user: User }) => {
    const {toggleSidebar} = useSidebar()
    return (
        <Sidebar variant="inset" collapsible="offcanvas" className="px-2 p-4">
            <SidebarHeader>
                <div className="flex gap-2 p-4 items-center">
                    <Sticker/>
                    <p className="font-bold text-lg">Together</p>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-4">

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-6 text-lg">
                            <Link href={`/${user.userId}/dashboard`} onClick={() => toggleSidebar()}>
                                <SidebarMenuItem className="flex gap-2 items-center ">
                                    <Home/>
                                    Dashboard

                                </SidebarMenuItem>
                            </Link>
                            <Link href={`/${user.userId}/today`} onClick={() => toggleSidebar()}>
                                <SidebarMenuItem className="flex gap-2 items-center">
                                    <ClipboardList/>
                                    Tasks
                                </SidebarMenuItem>
                            </Link>
                            <Link href={`/${user.userId}/trades`} onClick={() => toggleSidebar()}>
                                <SidebarMenuItem className="flex gap-2 items-center">
                                    <ArrowRightLeft />
                                    Trades
                                </SidebarMenuItem>
                            </Link>
                            <Link href={`/${user.userId}/inventory`} onClick={() => toggleSidebar()}>
                                <SidebarMenuItem className="flex gap-2 items-center">
                                    <Trophy />
                                    Inventory
                                </SidebarMenuItem>
                            </Link>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-2 w-full">
                <SidebarMenu className="flex flex-col p-4 md:p-2 w-full">
                    <SidebarMenuItem className="flex items-center justify-between w-full">
                        <Avatar className="h-10 w-10 rounded-full bg-gray-500">
                            <AvatarFallback className="rounded-lg">
                                <UserIcon/>
                            </AvatarFallback>
                        </Avatar>
                        <SettingsIcon />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}