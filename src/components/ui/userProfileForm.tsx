"use client"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Textarea} from "@/components/ui/textarea"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import * as zod from "zod";
import {User} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {useEffect} from "react";
import {getUserProfile} from "@/lib/supabase/api";
import {Check} from 'lucide-react'

export const UserProfileForm = ({userId}: {userId: string}) => {

    const {control, handleSubmit, reset} = useForm<zod.infer<typeof User>>({
        resolver: zodResolver(User),
        mode: "onSubmit",
        defaultValues: {
            userId: userId,
            fullName: "",
            bio: "",
            username: ""
        },
    })

    useEffect(() => {
        getUserProfile(userId).then(result => {
            reset(result)
        })
    }, [reset, userId]);

    const onSubmit: SubmitHandler<zod.infer<typeof User>> = async (data, event) => {
        // await updateUserProfile(data)
        // event?.preventDefault()
        console.log(data)
    }
    return (
        <form name="userProfileForm" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="md:grid md:grid-cols-2">
                <Controller
                    name="username"
                    render={
                        ({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <div className="flex gap-1">
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        id="username"
                                        placeholder="Enter your username"
                                        autoComplete="off"
                                    />
                                    <button type={"submit"}><Check /></button>
                                </div>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )
                    }
                    control={control}
                />
                <Controller
                    name="fullName"
                    render={
                        ({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="full-name"
                                    placeholder="Enter your Full Name"
                                    autoComplete="name"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )
                    }
                    control={control}
                />
                <Controller
                    name="bio"
                    render={
                        ({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                                <Textarea
                                    {...field}
                                    rows={10}
                                    aria-invalid={fieldState.invalid}
                                    id="bio"
                                    placeholder="Enter your Bio"
                                    autoComplete="off"
                                    className="min-h-0 field-sizing-fixed"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )
                    }
                    control={control}
                />
            </FieldGroup>
        </form>
    )
}