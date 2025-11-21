"use client"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useState, useEffect} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Task} from "@/lib/utils";
export const TaskAddEdit = ({taskId, task}: {taskId: string | undefined, task: Task | null}) => {
    // export interface Task {
    //     id: string
    //     title: string
    //     description: string
    //     branchName?: string
    //     microTasks?: Array<string>, // array of related micro task ids
    //     isComplete: boolean,
    //     isActive: boolean,
    //     tags?: Array<string>, // array of project ids
    //     userId: string
    // }
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [assignedTo, setAssignedTo] = useState<Array<string>>([]);
    const [deadline, setDeadline] = useState<Date>(new Date());

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
        </FieldGroup>
    )
}