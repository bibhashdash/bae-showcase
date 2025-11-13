import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Separator} from "@/components/ui/separator"

import {
    PiggyBank,
    HandCoins,
    BanknoteArrowDown,
    Sticker,
    CirclePlus,
    CircleUser,
    Home,
    ClipboardList
} from "lucide-react";
import Link from "next/link";

export const AppSidebar = ({userId}: { userId: string }) => {
    return (
        <Sidebar className="px-2 py-4">
            <SidebarHeader>
                <div className="flex gap-2">
                    <Sticker/>
                    DevZero
                </div>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    {/*<SidebarGroupLabel className="font-bold">*/}
                    {/*    My Stuff*/}
                    {/*</SidebarGroupLabel>*/}
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-2">
                            <Link href={`/${userId}/dashboard`}>
                                <SidebarMenuItem className="flex gap-2 items-center">
                                    <Home/>
                                    Dashboard

                                </SidebarMenuItem>
                            </Link>
                            <Link href={`/${userId}/today`}>
                                <SidebarMenuItem className="flex gap-2 items-center">
                                    <ClipboardList/>
                                    Today
                                </SidebarMenuItem>
                            </Link>
                            {/*<SidebarMenuItem className="flex gap-2 items-center">*/}
                            {/*    <BanknoteArrowDown className="text-primary" />*/}
                            {/*    Incomings*/}
                            {/*</SidebarMenuItem>*/}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/*<Separator className="my-4" />*/}
                {/*<SidebarGroup>*/}
                {/*    <SidebarGroupContent>*/}
                {/*        <SidebarMenu>*/}
                {/*            <SidebarMenuItem>*/}
                {/*                <SidebarMenuButton>*/}
                {/*                    <Link className="flex gap-2 items-center" href={`/${userId}/profile`}>*/}
                {/*                        <CircleUser className="text-primary"/>*/}
                {/*                        Profile</Link>*/}
                {/*                </SidebarMenuButton>*/}

                {/*            </SidebarMenuItem>*/}
                {/*        </SidebarMenu>*/}
                {/*    </SidebarGroupContent>*/}
                {/*</SidebarGroup>*/}
            </SidebarContent>
        </Sidebar>
    )
}