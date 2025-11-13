"use client"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {MicroTask, Task} from "@/lib/utils";
import {TabContent} from "@/app/(private)/[userId]/today/tabContent";
import {useState} from "react";
import {v4 as uuid} from "uuid";
import {Dialog} from "@/components/ui/dialog";
export const TodayTabbedView = ({userId}: {userId: string}) => {
    const [taskForm, setTaskForm] = useState<Task>();
    const [microTaskForm, setMicroTaskForm] = useState<Task>();

    const [tasks, setTasks] = useState<Array<Task>>([
        {
            userId: "1",
            branchName: "new bracnh",
            description: "this is a sample big task description",
            id: "task-number-one",
            isActive: true,
            isComplete: false,
            title: "Task number one"

        }
    ])
    const [microTasks, setMicroTasks] = useState<Array<MicroTask>>([
        {
            userId: "1",
            description: "Sample micro task description",
            isActive: true,
            isComplete: false,
            title: "Micro task number one",
            id: uuid(),
            taskId: "task-number-one"
        }
    ])
    return (
        <Tabs defaultValue="tasks" className="w-full h-full">
            <TabsList>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="subTasks">Sub-Tasks</TabsTrigger>
            </TabsList>
            <TabsContent className="h-full" value="tasks">
                <TabContent tabName="Tasks" taskDataItems={tasks} />
            </TabsContent>
            <TabsContent value="subTasks">
                <TabContent tabName="Sub Tasks" taskDataItems={microTasks} />
            </TabsContent>

        </Tabs>
    )
}