"use client"
import {ActivityIcon, CheckIcon, EllipsisIcon, Eye, PlusIcon, SquarePen, Trash2, X} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer"
import {useEffect, useState} from "react";
import {Task, User} from "@/lib/utils";
import {TaskDetails} from "@/app/(private)/[userId]/today/taskDetails";
import {Button} from "@/components/ui/button";
import {TaskAddEdit} from "@/app/(private)/[userId]/today/taskAddEdit";
import {addUserTask, deleteUserTask, markTaskCompletion, updateUserTask} from "@/lib/supabase/api";
import {getAllUserTasks} from "@/app/lib/actions";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {EmptyState} from "@/components/ui/EmptyState";
import {TasksList} from "@/app/(private)/[userId]/today/tasksList";

export const TodayTreeView = ({userId, user}: { userId: string, user: User }) => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [drawerContent, setDrawerContent] = useState<Task | null>(null);
    const [inEditMode, setInEditMode] = useState<boolean>(false);
    const [inAddMode, setInAddMode] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState<boolean | string>("all");

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

    useEffect(() => {
        getAllUserTasks(userId).then(result => setTasks(result));
    }, [isComplete]);

    return (
        <div className="w-full h-full relative">
            <div className="flex justify-between items-center my-2">

                {user.userRole === 0 && <Button
                    className="flex items-center"
                    onClick={() => {
                        setInEditMode(false);
                        setDrawerContent(null);
                        setShowDrawer(true);
                        setInAddMode(true)
                    }}>
                    Add Task
                    <PlusIcon
                        className="text-primary bg-white rounded-full"
                        size={16}/>
                </Button>}
            </div>
            <Tabs orientation="vertical" defaultValue="inProgress" className="w-full">
                <TabsList className="mb-2">
                    <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="inProgress">
                    <TasksList tasks={tasks.filter((task) => !task.isComplete)} />
                </TabsContent>
                <TabsContent value="completed">
                    <TasksList tasks={tasks.filter((task) => task.isComplete)} />
                </TabsContent>
            </Tabs>

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
        </div>
    )
}