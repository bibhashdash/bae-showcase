"use client";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {LoginSchema} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import Link from "next/link";
import {login} from "@/app/lib/actions";

const defaultValues: zod.infer<typeof LoginSchema> = {
    email: "",
    password: "",
}

export default function LoginPage({}) {

    const {control, handleSubmit, reset} = useForm<zod.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        mode: "onSubmit",
        defaultValues,
    })

    const onSubmit: SubmitHandler<zod.infer<typeof LoginSchema>> = async (data) => {
        await login(data)
    }

    return (
        <div className="flex min-h-screen justify-center items-center gap-2 h-full">
            <div className="w-full max-w-sm">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="" onSubmit={handleSubmit(onSubmit)} name="login-form">
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
                                <Field className="w-full">
                                    <Button className="cursor-pointer" onClick={() => {
                                        reset(defaultValues)
                                    }} variant="outline" type="reset" form="loginForm">Reset</Button>
                                    <Button className="cursor-pointer" type="submit">
                                        Login
                                    </Button>
                                    <FieldDescription className="text-center">
                                        Don&apos;t have an account? <Link href="/register">Sign up</Link>
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