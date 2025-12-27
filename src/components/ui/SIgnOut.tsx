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
                <LogOutIcon size={24}/>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Sign Out?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <div className="w-full flex gap-2 justify-center">
                        <DialogClose asChild>
                            <Button size={"lg"} type="button" variant="secondary" className="">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button size={"lg"} className="" onClick={() => signOut().then(redirect("/login"))}>Confirm</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}