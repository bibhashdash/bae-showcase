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

import {ClipboardList, Home, SettingsIcon, Sticker, UserIcon} from "lucide-react";
import Link from "next/link";
import {AuthUser} from "@/app/(private)/[userId]/layout";

export const AppSidebar = ({user}: { user: AuthUser }) => {
    const {toggleSidebar} = useSidebar()
    return (
        <Sidebar variant="inset" collapsible="offcanvas" className="px-2 p-4">
            <SidebarHeader>
                <div className="flex gap-2 p-4">
                    <Sticker/>
                    <p className="font-bold text-lg">Together</p>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-4">

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-4 text-lg">
                            <Link href={`/${user.id}/dashboard`} onClick={() => toggleSidebar()}>
                                <SidebarMenuItem className="flex gap-2 items-center ">
                                    <Home/>
                                    Dashboard

                                </SidebarMenuItem>
                            </Link>
                            <Link href={`/${user.id}/today`} onClick={() => toggleSidebar()}>
                                <SidebarMenuItem className="flex gap-2 items-center">
                                    <ClipboardList/>
                                    Tasks
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