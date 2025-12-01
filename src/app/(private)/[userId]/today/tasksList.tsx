import {Task} from "@/lib/utils";
import {TaskRow} from "@/app/(private)/[userId]/today/taskRow";

export const TasksList = ({tasks}: {tasks: Array<Task>}) => {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 overflow-auto">
            {tasks.map(task => <TaskRow key={task.id} task={task} />)}
        </div>
    )
}