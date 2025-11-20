"use client"
import {EllipsisVertical} from "lucide-react";
import {Item, ItemActions, ItemContent} from "@/components/ui/item";
import {v4 as uuid} from "uuid";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Task} from "@/lib/utils";

const defaultTasks: Array<Task> = [
    {
        userId: uuid(),
        description: "description of this task",
        isActive: true,
        isComplete: false,
        id: uuid(),
        title: "This is a task",
    }
]

export const TodayTreeView = ({userId}: { userId: string }) => {
    const [tasks, setTasks] = useState<Array<Task>>(defaultTasks);
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <div className="w-full">
            {
                tasks.map(
                    (task: Task) =>
                        <Item
                            key={task.id}
                            onClick={() => setShowDrawer(true)}
                            className="border border-gray-200 w-full py-2 cursor-pointer"
                        >
                            <ItemContent>{task.title}</ItemContent>
                            <ItemActions>
                                <DropdownMenu>
                                    <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="cursor-pointer">Mark Complete</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </ItemActions>
                        </Item>
                )
            }
            <Drawer direction="right" open={showDrawer} onClose={() => setShowDrawer(false)}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Task: Task name</DrawerTitle>
                        <DrawerDescription>And you have some sub-tasks</DrawerDescription>
                    </DrawerHeader>
                    <div>Hello</div>
                    <DrawerFooter>
                        <Button type="button" onClick={() => setShowDrawer(false)}>Submit</Button>
                        <Button type="button" variant="outline" onClick={() => setShowDrawer(false)}>Cancel</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}