"use client"
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet, FieldTitle} from "@/components/ui/field";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as zod from "zod";
import {RegisterSchema} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";

const defaultValues: zod.infer<typeof RegisterSchema> = {
    email: "",
    password: "",
    confirm: ""
}

export default function RegisterPage (){
    const {control, handleSubmit, reset} = useForm<zod.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        mode: "onSubmit",
        defaultValues: defaultValues,
    })
    const onSubmit = (data: zod.infer<typeof RegisterSchema>) => {
        console.log(data)
        reset(defaultValues)
    }
    return (
        <div className="flex justify-center items-center gap-2 h-full w-full">
            <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
                <FieldSet>
                    <FieldTitle>Sign Up</FieldTitle>
                    <FieldDescription>Enjoy the best of this journaling app</FieldDescription>
                    <FieldGroup>
                        <Controller name="email" control={control} render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}/>
                        <Controller name="password" control={control} render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="password"
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}/>
                        <Controller name="confirm" control={control} render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
                                <Input
                                    type="password"
                                    id="confirm"
                                    placeholder="password"
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                />
                                { fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}/>
                        <Field orientation="horizontal" className="w-full">
                            <Button onClick={() => reset(defaultValues)} variant="outline" type="reset" form="registerForm">Reset</Button>
                            <Button type="submit" form="registerForm">Save</Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </form>
        </div>
    )
}