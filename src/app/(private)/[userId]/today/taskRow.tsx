import {Task} from "@/lib/utils";
import {Item} from "@/components/ui/item";

export const TaskRow = ({task}: {task: Task}) => {
    return (
        <div>
            <p>{task.title}</p>
        </div>
    )
}