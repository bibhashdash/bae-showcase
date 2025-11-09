"use client"
import { useSidebar } from "@/components/ui/sidebar"
import {Menu} from "lucide-react";

export const CustomSIdebarTrigger = () => {
    const { toggleSidebar } = useSidebar()

    return <button className="cursor-pointer lg:hidden" onClick={toggleSidebar}><Menu /></button>
}