import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
export const TaskAddEdit = () => {
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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [branch, setBranch] = useState("");

    return (
        <FieldGroup className="w-full">
            <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                    id="title"
                    placeholder="Enter your task name"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="branch">Branch Name</FieldLabel>
                <Input
                    id="branch"
                    placeholder="Enter your branch name"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                    id="description"
                    placeholder="Enter a task description"
                />
            </Field>
        </FieldGroup>
    )
}