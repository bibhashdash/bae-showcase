import {Task} from "@/lib/utils";
import {Gem, PlusIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge"

export const TaskRow = ({task}: {task: Task}) => {
    return (
        <div className="flex items-center justify-between">
            <p>{task.title}</p>
            <div>
                <Badge variant="default" className="bg-sky-600">
                    <Gem size={18} stroke="#ffffff" />
                    {task.value ?? null}
                    <PlusIcon size={18} stroke="#ffffff" />
                </Badge>
            </div>
        </div>
    )
}