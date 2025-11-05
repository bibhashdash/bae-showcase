"use client"
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as zod from "zod";
import {RegisterSchema} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {signup} from "@/app/lib/actions";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import Link from "next/link";

const defaultValues: zod.infer<typeof RegisterSchema> = {
    email: "",
    password: "",
    confirm: ""
}

export default function RegisterPage() {
    const {control, handleSubmit, reset} = useForm<zod.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        mode: "onSubmit",
        defaultValues: defaultValues,
    })
    const onSubmit = async (data: zod.infer<typeof RegisterSchema>) => {
        await signup(data)
        reset(defaultValues)
    }
    return (
        <div className="flex min-h-screen justify-center items-center gap-2 h-full w-full">
            <div className="w-full max-w-sm">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Sign Up to Journalease</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
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
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                    </Field>
                                )}/>
                                <Field className="w-full">
                                    <Button type="submit" form="registerForm">Register</Button>
                                    <FieldDescription className="text-center">
                                        Already have an account? <Link href="/login">Login</Link>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}