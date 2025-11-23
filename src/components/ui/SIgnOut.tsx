"use client"
import {LogOutIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {signOut} from "@/lib/supabase/api";
import {redirect} from "next/navigation";

export const SignOutButton = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"secondary"} size={"lg"} className="text-lg">Sign out<LogOutIcon size={16}/></Button>
            </DialogTrigger>
            <DialogContent className="text-lg">
                <DialogHeader>
                    <DialogTitle>Sign Out?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <div className="w-full flex gap-2 justify-center">
                        <DialogClose asChild>
                            <Button size={"lg"} type="button" variant="secondary" className="text-lg">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button size={"lg"} className="text-lg" onClick={() => signOut().then(redirect("/login"))}>Confirm</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}