"use client"
import {ActivityIcon, CheckIcon, EllipsisIcon, Eye, PlusIcon, SquarePen, Trash2, X} from "lucide-react";
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
import {addUserTask, deleteUserTask, getAllUserTasks, markTaskCompletion, updateUserTask} from "@/lib/supabase/api";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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
            updateUserTask(task).then(() => getAllUserTasks(userId)).then(result => setTasks(result)).finally(() => setShowDrawer(false));
        } else if (inAddMode) {
            addUserTask(task).then(result => {
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

    const markComplete = (taskId: string) => {
        markTaskCompletion(taskId, true).then(() => getAllUserTasks(userId)).then(result => setTasks(result));
    }

    const markInComplete = (taskId: string) => {
        markTaskCompletion(taskId, false).then(() => getAllUserTasks(userId)).then(result => setTasks(result));
    }

    return (
        <div className="w-full h-full relative">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2">
                {
                    tasks.map(
                        (task: Task) =>
                            <div
                                key={task.id}
                                className="text-lg border rounded border-gray-200 p-2 flex items-center gap-2 w-full relative"
                            >
                                {task.isComplete ? <CheckIcon className="text-success" /> : <ActivityIcon className="text-warning" />}
                                <p className={`overflow-hidden truncate text-ellipsis ${task.isComplete ? "line-through" : ""}`}>{task.title}</p>
                                <div className="absolute right-2">
                                    <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                className="flex gap-2 items-center cursor-pointer hover:rounded hover:bg-primary hover:text-white focus:outline-none p-1">
                                                <EllipsisIcon/>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="p-3" align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setShowDrawer(true)
                                                        setDrawerContent(task)
                                                    }}
                                                    className="cursor-pointer hover:bg-gray-200 text-lg">
                                                    <Eye /> View Details
                                                </DropdownMenuItem>
                                                {task.isComplete
                                                    ? <DropdownMenuItem onClick={() => markInComplete(task.id)}
                                                                        className="cursor-pointer hover:bg-gray-200 text-lg">
                                                        <ActivityIcon /> Mark Incomplete
                                                    </DropdownMenuItem>
                                                    : <DropdownMenuItem onClick={() => markComplete(task.id)}
                                                                        className="cursor-pointer hover:bg-gray-200 text-lg">
                                                       <CheckIcon /> Mark Complete
                                                    </DropdownMenuItem>}
                                                <DropdownMenuItem onClick={() => {
                                                    setDrawerContent(task);
                                                    setShowDrawer(true);
                                                    setInEditMode(true)
                                                }} className="cursor-pointer hover:bg-gray-200 text-lg">
                                                    <SquarePen /> Edit</DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DialogTrigger>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setShowDrawer(false);
                                                            setDeleteId(task.id)
                                                        }}
                                                        className="cursor-pointer hover:bg-gray-200 text-lg">
                                                        <Trash2 /> Delete</DropdownMenuItem>
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
                                                <DialogClose asChild><Button size={"lg"} variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button></DialogClose>
                                                <Button size={"lg"} onClick={() => handleDelete()} type="submit">Confirm</Button>
                                            </DialogFooter>
                                        </DialogContent>

                                    </Dialog>
                                </div>
                            </div>
                    )
                }
            </div>
            <Drawer open={showDrawer} onClose={closeDrawer}>
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
                <PlusIcon
                    className="text-white bg-rose-500 rounded-full"
                    onClick={() => {
                    setInEditMode(false);
                    setDrawerContent(null);
                    setShowDrawer(true);
                    setInAddMode(true)
                }} size={64}/>
            </div>
        </div>
    )
}