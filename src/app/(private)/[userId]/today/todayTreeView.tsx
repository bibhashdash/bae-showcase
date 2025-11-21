"use client"
import {CirclePlus, MenuIcon, X} from "lucide-react";
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
import {Button} from "@/components/ui/button";
import {TaskAddEdit} from "@/app/(private)/[userId]/today/taskAddEdit";

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
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [drawerContent, setDrawerContent] = useState<Task | null>(null);
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [inAddMode, setInAddMode] = useState<boolean>(false);
    console.log(userId)
    const closeDrawer = () => {
        setInEditMode(false);
        setInAddMode(false);
        setShowDrawer(false);
        setDrawerContent(null);
    }
    return (
        <div className="w-full h-full relative">
            {
                tasks.map(
                    (task: Task) =>
                        <Item
                            key={task.id}
                            onClick={() => {
                                setShowDrawer(true)
                                setDrawerContent(task)
                            }}
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
                                        <DropdownMenuItem onClick={() => {
                                            setDrawerContent(task);
                                            setInEditMode(true)
                                        }} className="cursor-pointer hover:bg-gray-200">Edit</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </ItemActions>
                        </Item>
                )
            }
            <Drawer direction="right" open={showDrawer} onClose={closeDrawer}>
                <DrawerContent>
                    <DrawerHeader>
                        <div className="flex justify-between items-center">
                            <DrawerTitle className="text-2xl">{inEditMode ? <>Edit Task</> : inAddMode ? <>Add Task</> : drawerContent?.title}</DrawerTitle>
                            <X className="cursor-pointer" onClick={closeDrawer} />
                        </div>
                    </DrawerHeader>
                    <div className="p-4">
                        {drawerContent?.description}
                        {
                            (inEditMode || inAddMode)
                                ? <TaskAddEdit taskId={inEditMode ? drawerContent?.id : undefined} task={inEditMode ? drawerContent : null} />
                                : <TaskDetails task={drawerContent}/>
                        }
                    </div>
                </DrawerContent>
            </Drawer>
            <div className="absolute bottom-0 right-0"><Button onClick={() => {
                setInEditMode(false);
                setDrawerContent(null);
                setShowDrawer(true);
                setInAddMode(true)
            }}>Add Task <CirclePlus /></Button></div>
        </div>
    )
}