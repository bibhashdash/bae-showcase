"use client"
import {ArrowRight, CalendarIcon, EllipsisVertical, ListTodo, MenuIcon, UsersIcon} from "lucide-react";
import {Item, ItemActions, ItemContent} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge"
import {v4 as uuid} from "uuid";
import dayjs from 'dayjs'
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
import {TaskDetails} from "@/app/(private)/[userId]/today/taskDetails";

const defaultTasks: Array<Task> = [
    {
        userId: uuid(),
        description: "description of this task",
        isActive: true,
        isComplete: false,
        id: uuid(),
        title: "This is a task",
        deadline: new Date(),
        assignedTo: ["Arjun", "Nathaniel"]
    }
]

export const TodayTreeView = ({userId}: { userId: string }) => {
    const [tasks, setTasks] = useState<Array<Task>>(defaultTasks);
    const [drawerContent, setDrawerContent] = useState<Task | null>(null);

    return (
        <div className="w-full">
            {
                tasks.map(
                    (task: Task) =>
                        <Item
                            key={task.id}
                            onClick={() => setDrawerContent(task)}
                            className="border border-gray-200 w-full py-2 cursor-pointer hover:bg-gray-100 focus:outline-none"
                        >
                            <ItemContent>{task.title}</ItemContent>
                            <ItemActions>
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className="flex gap-2 border border-gray-200 rounded items-center cursor-pointer hover:bg-black hover:text-white focus:outline-none p-1">
                                        <MenuIcon />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">Mark Complete</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </ItemActions>
                        </Item>
                )
            }
            <Drawer direction="right" open={drawerContent !== null} onClose={() => setDrawerContent(null)}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-2xl">{drawerContent?.title}</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4">
                        {drawerContent?.description}
                        <TaskDetails task={drawerContent} />
                    </div>
                    <DrawerFooter>
                        <Button type="button" onClick={() => setDrawerContent(null)}>Submit</Button>
                        <Button type="button" variant="outline" onClick={() => setDrawerContent(null)}>Cancel</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}