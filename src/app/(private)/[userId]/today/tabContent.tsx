import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {CheckIcon, CirclePlus, DeleteIcon, EditIcon, Trash2Icon, TrashIcon} from "lucide-react";
import {MicroTask, Task} from "@/lib/utils";
import {Item, ItemActions, ItemContent, ItemDescription,} from "@/components/ui/item"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useState} from "react";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {TaskAddEdit} from "@/app/(private)/[userId]/today/taskAddEdit";
import {Button} from "@/components/ui/button";

export const TabContent = (
    {tabName, taskDataItems}: {tabName: string, taskDataItems: Array<Task> | Array<MicroTask>}
) => {

    return (
        <Card className="h-full">
            <CardHeader className="border-b border-gray-200 flex items-center justify-between">
                <CardTitle>{tabName}</CardTitle>
               <Dialog>
                   <DialogTrigger>
                       <CirclePlus className="cursor-pointer" />
                   </DialogTrigger>
                   <DialogContent>
                       <DialogHeader><DialogTitle>Add to your {tabName}</DialogTitle></DialogHeader>
                       <form>
                           { tabName === "Tasks" && <TaskAddEdit /> }
                           {/*{*/}
                           {/*    tabName === "Sub Tasks" && (*/}

                           {/*    )*/}
                           {/*}*/}
                       </form>
                       <DialogFooter>
                           <DialogClose asChild>
                               <Button variant="outline">Cancel</Button>
                           </DialogClose>
                           <Button type="submit">Save changes</Button>
                       </DialogFooter>
                   </DialogContent>
               </Dialog>
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
                                    <Trash2Icon />
                                </ItemActions>
                            </Item>
                        )
                    )
                }
            </CardContent>
        </Card>
    )
}