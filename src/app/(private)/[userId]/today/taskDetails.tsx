import {ArrowRight, CalendarIcon, ListTodo, UsersIcon} from "lucide-react";
import dayjs from "dayjs";
import {Badge} from "@/components/ui/badge";
import {Task} from "@/lib/utils";

export const TaskDetails = ({task}: { task: Task | null }) => {
    return (
        <div className="pt-5 flex flex-col gap-3">
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center"><CalendarIcon size="16"/> Deadline <ArrowRight size="16"/>
                    {task?.deadline ? dayjs(task?.deadline).format('DD/MM/YYYY') : <>Indefinite</>}
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center"><UsersIcon size="16"/> Assigned To <ArrowRight
                    size="16"/></div>
                {
                    task && task.assignedTo && task.assignedTo.length > 0 &&
                    task?.assignedTo?.map((item) => <Badge key={item}>{item}</Badge>)
                }
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center"><ListTodo size="16"/> Status <ArrowRight
                    size="16"/></div>
                <Badge className={task?.isComplete ? "bg-green-500" : "bg-amber-500"}
                       variant={task?.isComplete ? "default" : "outline"}>{task?.isComplete ? <>Complete</> : <>In
                    Progress</>}</Badge>
            </div>
        </div>
    )
}