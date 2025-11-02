"use client";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {LoginSchema} from "@/lib/utils";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet, FieldTitle} from "@/components/ui/field";
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
        console.log(data)
        const result = await login(data)
        console.log(result)
        // reset(defaultValues)
    }

    return (
        <div className="flex justify-center items-center gap-2 h-full w-full">
            <form onSubmit={handleSubmit(onSubmit)} name="login-form">
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
                            <button type="submit">
                                Login
                            </button>
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
//
// function SubmitButton() {
//     const {pending} = useFormStatus();
//
//     return (
//         <button disabled={pending} type="submit">
//             Login
//         </button>
//     );
// }