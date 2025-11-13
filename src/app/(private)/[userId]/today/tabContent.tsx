import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckIcon, CirclePlus, DeleteIcon, EditIcon} from "lucide-react";
import {MicroTask, Task} from "@/lib/utils";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
export const TabContent = ({tabName, taskDataItems}: {tabName: string, taskDataItems: Array<Task> | Array<MicroTask>}) => {
    return (
        <Card className="h-full">
            <CardHeader className="border-b border-gray-200 flex items-center justify-between">
                <CardTitle>{tabName}</CardTitle>
                <CirclePlus className="cursor-pointer" />
            </CardHeader>
            <CardContent>
                {
                    taskDataItems.length > 0 && taskDataItems.map(
                        item => (
                            <Item variant="outline" key={item.id}>
                                <ItemContent>
                                    <ItemDescription>{item.description}</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <CheckIcon />
                                    <EditIcon />
                                    <DeleteIcon />
                                </ItemActions>
                            </Item>
                        )
                    )
                }
            </CardContent>
        </Card>
    )
}