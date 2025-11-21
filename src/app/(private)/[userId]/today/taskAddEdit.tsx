"use client"
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Task} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {ChevronDownIcon} from "lucide-react";
import { enGB } from "react-day-picker/locale";

export const TaskAddEdit = ({taskId, task}: {taskId: string | undefined, task: Task | null}) => {
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

            <Field className="w-fit">
                <Label htmlFor="is-complete">Complete?</Label>
                <div className="flex">
                    <Switch onCheckedChange={setIsComplete} checked={isComplete} id="is-complete" />
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
                            {deadline ? deadline.toLocaleDateString() : "Select deadline"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            locale={enGB}
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
    )
}