import {Input} from "@/components/ui/input";
import {CirclePlus, SearchIcon} from "lucide-react";
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
import {NewRide} from "@/app/(private)/[userId]/dashboard/newRide";

export const FeedHeader = ({}) => {
    return (
        <div className="flex gap-4 items-center w-full p-2">
            <div className="flex items-center w-100 gap-1">
                <Input placeholder="Search all rides" />
                <SearchIcon />
            </div>
            <Dialog>
                <DialogTrigger asChild><Button className="rounded-md">Post <CirclePlus/></Button></DialogTrigger>
                <DialogContent className="h-[80vh]" aria-describedby="New ride form">
                    <DialogHeader>
                        <DialogTitle>New Ride</DialogTitle>
                    </DialogHeader>
                    <NewRide />
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}