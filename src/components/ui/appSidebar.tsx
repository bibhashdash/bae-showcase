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
import { Separator } from "@/components/ui/separator"

import {PiggyBank, HandCoins, BanknoteArrowDown, Sticker, CirclePlus, CircleUser} from "lucide-react";
import Link from "next/link";
export const AppSidebar = ({userId}: {userId: string}) => {
    return (
        <Sidebar className="px-2 py-4">
            <SidebarHeader>
                <div className="flex gap-2">
                    <Sticker />
                    Expensior
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                                >
                                    <CirclePlus />
                                    Quick Entry
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold">
                        My Stuff
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-2">
                            <SidebarMenuItem className="flex gap-2 items-center">
                                <PiggyBank className="text-primary" />
                                Budgets
                            </SidebarMenuItem>
                            <SidebarMenuItem className="flex gap-2 items-center">
                                <HandCoins className="text-primary" />
                                Outgoings
                            </SidebarMenuItem>
                            <SidebarMenuItem className="flex gap-2 items-center">
                                <BanknoteArrowDown className="text-primary" />
                                Incomings
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <Separator className="my-4" />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Link className="flex gap-2 items-center" href={`/${userId}/profile`}>
                                        <CircleUser className="text-primary"/>
                                        Profile</Link>
                                </SidebarMenuButton>

                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}