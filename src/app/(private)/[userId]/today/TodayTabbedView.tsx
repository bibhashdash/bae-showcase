import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {MicroTask, Task} from "@/lib/utils";

const tasks: Array<Task> = []
const microTasks: Array<MicroTask> = []

export const TodayTabbedView = ({userId}: {userId: string}) => {
    return (
        <Tabs defaultValue="tasks" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="subTasks">Sub-Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
                View all your big tasks here.
            </TabsContent>
            <TabsContent value="subTasks">
                View all your micro tasks here.
            </TabsContent>
        </Tabs>
    )
}