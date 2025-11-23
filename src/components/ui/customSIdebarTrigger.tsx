"use client"
import { useSidebar } from "@/components/ui/sidebar"
import {Menu} from "lucide-react";

export const CustomSidebarTrigger = () => {
    const { toggleSidebar } = useSidebar()

    return <button className="cursor-pointer" onClick={toggleSidebar}><Menu /></button>
}