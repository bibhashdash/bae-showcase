import {Task} from "@/lib/utils";
import {Gem, PlusIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export const TaskRow = ({task}: {task: Task}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <p>{task.title}</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {task.description ?? null}
            </CardContent>
            <div>
                <Badge variant="default" className="bg-sky-600">
                    <Gem size={18} stroke="#ffffff" />
                    {task.value ?? null}
                    <PlusIcon size={18} stroke="#ffffff" />
                </Badge>
            </div>
        </Card>
    )
}