"use client"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

// export interface MicroTask {
//     id: string
//     title: string
//     description: string,
//     isComplete: boolean,
//     isActive: boolean,
//     taskId: string,
//     userId: string
// }

export const MicroTaskAddEdit = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskId, setTaskId] = useState("");

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
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                    id="description"
                    placeholder="Enter a task description"
                />
            </Field>
        </FieldGroup>
    )
}