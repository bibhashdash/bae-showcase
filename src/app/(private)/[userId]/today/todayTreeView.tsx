import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {Button} from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {ChevronDown, ChevronsUpDown, CodeIcon} from "lucide-react";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
export const TodayTreeView = ({userId}: {userId: string}) => {
    return (
        <div className="w-full grid grid-cols-2 gap-4">
            <Card>
                <CardContent className="flex flex-col items-center">
                    <CodeIcon size={48} />
                    <p>Name of task</p>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                    <Badge
                        className="h-10 min-w-10 rounded-full px-1 font-mono tabular-nums"
                        variant="default"
                    >
                        9
                    </Badge>
                    <Badge
                        className="h-10 min-w-10 rounded-full px-1 font-mono tabular-nums"
                        variant="destructive"
                    >
                        3
                    </Badge>
                </CardFooter>
            </Card>

        </div>
    )
}