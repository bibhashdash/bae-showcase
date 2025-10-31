"use client";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {loginSchema} from "@/lib/utils";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet, FieldTitle} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import Link from "next/link";

const defaultValues: zod.infer<typeof loginSchema> = {
    email: "",
    password: "",
}

export default function LoginPage({}) {
    const {control, handleSubmit, reset} = useForm<zod.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        defaultValues,
    })
    const onSubmit = async (data: zod.infer<typeof loginSchema>) => {
        console.log(data)
        reset(defaultValues)
    }
    return (
        <div className="flex justify-center items-center gap-2 h-full w-full">
            <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <FieldSet>
                    <FieldTitle>Login</FieldTitle>
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
                        <Field orientation="horizontal" className="w-full">
                            <Button onClick={() => {
                                reset(defaultValues)
                            }} variant="outline" type="reset" form="loginForm">Reset</Button>
                            <Button type="submit" form="loginForm">Save</Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <Link href="/register">
                    <p className="underline font-bold">Sign Up</p>
                </Link>
            </form>
        </div>
    )
}