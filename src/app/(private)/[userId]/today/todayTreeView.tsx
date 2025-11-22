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
import {useEffect, useState} from "react";
import {Task} from "@/lib/utils";
import {TaskDetails} from "@/app/(private)/[userId]/today/taskDetails";
import {Button} from "@/components/ui/button";
import {TaskAddEdit} from "@/app/(private)/[userId]/today/taskAddEdit";
import {addUserTask, deleteUserTask, getAllUserTasks, updateUserTask} from "@/lib/supabase/api";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const userFriends: Array<string> = ["Arjun", "Nathaniel", "Kirstie"]

export const TodayTreeView = ({userId}: { userId: string }) => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [drawerContent, setDrawerContent] = useState<Task | null>(null);
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [inAddMode, setInAddMode] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const closeDrawer = () => {
        setInEditMode(false);
        setInAddMode(false);
        setShowDrawer(false);
        setDrawerContent(null);
    }

    const onSubmit = (task: Task) => {
        if (inEditMode) {
            updateUserTask(task, userId).then(() => getAllUserTasks(userId)).then(result => setTasks(result));
        } else if (inAddMode) {
            addUserTask(task, userId).then(result => {
                setTasks(prevTasks => [...prevTasks, result])
                setShowDrawer(false);
            });
        }
    }

    useEffect(() => {
        getAllUserTasks(userId).then(result => setTasks(result));
    }, [])

    const handleDelete = () => {
        if (deleteId) {
            deleteUserTask(deleteId).then(() => getAllUserTasks(userId)).then(result => {
                setTasks(result)
                setShowDeleteModal(false)
            });
        }
    }

    return (
        <div className="w-full h-full relative">
            <div className="flex flex-col gap-2">
                {
                    tasks.map(
                        (task: Task) =>
                            <Item
                                key={task.id}
                                className="border border-gray-200 w-full py-2 cursor-pointer hover:bg-gray-100 focus:outline-none"
                            >
                                <ItemContent>{task.title}</ItemContent>
                                <ItemActions>
                                    <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                className="flex gap-2 border border-gray-200 rounded items-center cursor-pointer hover:bg-black hover:text-white focus:outline-none p-1">
                                                <MenuIcon/>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setShowDrawer(true)
                                                        setDrawerContent(task)
                                                    }}
                                                    className="cursor-pointer hover:bg-gray-200">View Details</DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">Mark
                                                    Complete</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => {
                                                    setDrawerContent(task);
                                                    setShowDrawer(true);
                                                    setInEditMode(true)
                                                }} className="cursor-pointer hover:bg-gray-200">Edit</DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DialogTrigger>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setShowDrawer(false);
                                                            setDeleteId(task.id)
                                                        }}
                                                        className="cursor-pointer hover:bg-gray-200">Delete</DropdownMenuItem>
                                                </DialogTrigger>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Delete Task</DialogTitle>
                                                <DialogDescription>
                                                    There's no going back from this! Are you sure?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild><Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button></DialogClose>
                                                <Button onClick={() => handleDelete()} type="submit">Confirm</Button>
                                            </DialogFooter>
                                        </DialogContent>

                                    </Dialog>
                                </ItemActions>
                            </Item>
                    )
                }
            </div>
            <Drawer direction="right" open={showDrawer} onClose={closeDrawer}>
                <DrawerContent>
                    <DrawerHeader>
                        <div className="flex justify-between items-center">
                            <DrawerTitle className="text-2xl">{inEditMode ? <>Edit Task</> : inAddMode ? <>Add
                                Task</> : drawerContent?.title}</DrawerTitle>
                            <X className="cursor-pointer" onClick={closeDrawer}/>
                        </div>
                    </DrawerHeader>
                    {
                        (inEditMode || inAddMode)
                            ? <TaskAddEdit
                                userId={userId}
                                onCancelAction={() => closeDrawer()}
                                onSubmitAction={task => onSubmit(task)}
                                userFriends={userFriends}
                                taskId={inEditMode ? drawerContent?.id : undefined}
                                task={inEditMode ? drawerContent : null}
                            />
                            : <TaskDetails
                                task={drawerContent}
                            />
                    }
                </DrawerContent>
            </Drawer>
            <div className="absolute bottom-0 right-0">
                <Button
                    className="cursor-pointer"
                    onClick={() => {
                        setInEditMode(false);
                        setDrawerContent(null);
                        setShowDrawer(true);
                        setInAddMode(true)
                    }}
                >
                    Add Task <CirclePlus/>
                </Button>
            </div>
        </div>
    )
}