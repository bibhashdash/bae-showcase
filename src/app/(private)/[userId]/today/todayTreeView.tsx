"use client"
import {MenuIcon, X} from "lucide-react";
import {Item, ItemActions, ItemContent} from "@/components/ui/item";
import {v4 as uuid} from "uuid";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer"
import {useState} from "react";
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
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    console.log(userId)
    const closeDrawer = () => {
        setInEditMode(false);
        setDrawerContent(null);
    }
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
                                        <DropdownMenuItem onClick={() => setInEditMode(true)} className="cursor-pointer hover:bg-gray-200">Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </ItemActions>
                        </Item>
                )
            }
            <Drawer direction="right" open={drawerContent !== null} onClose={closeDrawer}>
                <DrawerContent>
                    <DrawerHeader>
                        <div className="flex justify-between items-center">
                            <DrawerTitle className="text-2xl">{inEditMode && <>Editing - </>}{drawerContent?.title}</DrawerTitle>
                            <X className="cursor-pointer" onClick={closeDrawer} />
                        </div>
                    </DrawerHeader>
                    <div className="p-4">
                        {drawerContent?.description}
                        <TaskDetails task={drawerContent} />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}