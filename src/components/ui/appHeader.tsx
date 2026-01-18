"use client"
import {SignOutButton} from "@/components/ui/SIgnOut";
import {CirclePlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

export const AppHeader = ({organisationId}: {organisationId: string}) => {
    return (
        <header
            className="sticky top-0 z-10 flex h-16 items-center border-b border-b-border justify-between bg-background px-6">
            <p className="text-4xl">CC</p>
            <div className="flex items-center gap-2">
                <Button onClick={() => redirect(`/${organisationId}/rides`)} className="rounded-md">Post </Button>
                <SignOutButton/>
            </div>
        </header>
    )
}