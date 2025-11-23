"use client"
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Task} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {ChevronDownIcon} from "lucide-react";
import {v4 as uuid} from "uuid";

export const TaskAddEdit = ({userId, taskId, task, onCancelAction, onSubmitAction}: {
    userId: string,
    taskId: string | undefined,
    task: Task | null,
    onCancelAction: () => void,
    onSubmitAction: (task: Task) => void
}) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [assignedTo, setAssignedTo] = useState<Array<string>>([]);
    const [deadline, setDeadline] = useState<Date | undefined>(new Date());
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

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
                        <FieldLabel className="text-lg" htmlFor="title">Title</FieldLabel>
                        <Input
                            className="text-lg h-12"
                            value={title}
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your task name"
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="text-lg" htmlFor="description">Description</FieldLabel>
                        <Textarea
                            className="text-lg"
                            value={description}
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a task description"
                        />
                    </Field>

                    <Field className="w-fit">
                        <Label className="text-lg" htmlFor="is-complete">Complete?</Label>
                        <div className="flex text-lg">
                            <Switch onCheckedChange={setIsComplete} checked={isComplete} id="is-complete"/>
                        </div>
                    </Field>

                    <Field>
                        <FieldLabel className="text-lg" htmlFor="deadline">Deadline</FieldLabel>
                        <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 h-12 justify-between font-normal text-lg"
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
                <Button onClick={onCancelAction} className="cursor-pointer text-lg" variant="secondary">Cancel</Button>
                <Button onClick={() => onSubmitAction({
                    userId: userId,
                    id: taskId !== undefined ? taskId : uuid(),
                    assignedTo: assignedTo,
                    deadline: deadline,
                    isComplete: isComplete,
                    title: title,
                    description: description,
                })} className="cursor-pointer text-lg">Submit</Button>
            </div>
        </div>
    )
}