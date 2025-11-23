"use client"
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Task} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Calendar} from "@/components/ui/calendar"
import {Checkbox} from "@/components/ui/checkbox"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {ChevronDownIcon} from "lucide-react";
import {DrawerFooter,} from "@/components/ui/drawer"
import {v4 as uuid} from "uuid";

export const TaskAddEdit = ({userId, taskId, task, userFriends, onCancelAction, onSubmitAction}: {
    userId: string,
    taskId: string | undefined,
    task: Task | null,
    userFriends: Array<string>,
    onCancelAction: () => void,
    onSubmitAction: (task: Task) => void
}) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [assignedTo, setAssignedTo] = useState<Array<string>>([]);
    const [deadline, setDeadline] = useState<Date | undefined>(new Date());
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

    const handleCheckChange = (element: string, checked: boolean) => {
        const index = assignedTo?.indexOf(element);
        const isCurrentlyPresent = index !== -1;
        if (checked) {
            if (isCurrentlyPresent) {
                setAssignedTo(assignedTo);
            } else {
                setAssignedTo(prevState => [...prevState, element]);
            }
        } else {
            if (isCurrentlyPresent) {
                setAssignedTo(prevState => [
                    ...prevState.slice(0, index),
                    ...prevState.slice(index + 1)
                ]);
            } else {
                setAssignedTo(assignedTo);
            }
        }
    }

    useEffect(() => {
        if (taskId !== undefined && task !== null) {
            setTitle(task.title);
            setDescription(task.description);
            setIsComplete(task.isComplete);
            if (task.assignedTo !== undefined) {
                setAssignedTo(task.assignedTo);
            }
            if (task.deadline !== undefined) {
                setDeadline(task.deadline);
            }
        }
    }, [taskId]);

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="p-4">
                <FieldGroup className="w-full">
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input
                            value={title}
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your task name"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea
                            value={description}
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a task description"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="assigned-to">Assigned To</FieldLabel>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                userFriends.length > 0 &&
                                userFriends.map(
                                    friend =>
                                        <div key={friend} className="flex gap-2">
                                            <Checkbox checked={assignedTo?.includes(friend)}
                                                      onCheckedChange={checked => handleCheckChange(friend, checked as boolean)}/>
                                            <Label htmlFor={friend}>{friend}</Label>
                                        </div>
                                )
                            }
                        </div>
                    </Field>

                    <Field className="w-fit">
                        <Label htmlFor="is-complete">Complete?</Label>
                        <div className="flex">
                            <Switch onCheckedChange={setIsComplete} checked={isComplete} id="is-complete"/>
                        </div>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
                        <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                >
                                    {(deadline && true) ? new Date(deadline).toLocaleDateString() : "Select deadline"}
                                    <ChevronDownIcon/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={deadline}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDeadline(date)
                                        setOpenDatePicker(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>
                </FieldGroup>
            </div>
            <div className="flex gap-2 justify-end p-4">
                <Button onClick={onCancelAction} className="cursor-pointer" variant="secondary">Cancel</Button>
                <Button onClick={() => onSubmitAction({
                    userId: userId,
                    id: taskId !== undefined ? taskId : uuid(),
                    assignedTo: assignedTo,
                    deadline: deadline,
                    isComplete: isComplete,
                    title: title,
                    description: description,
                })} className="cursor-pointer">Submit</Button>
            </div>
        </div>
    )
}