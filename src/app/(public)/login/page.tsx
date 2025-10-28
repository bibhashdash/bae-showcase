"use client";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {loginSchema} from "@/lib/utils";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"

export default function LoginPage({}) {
    const {control, handleSubmit} = useForm<zod.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const onSubmit = (data: zod.infer<typeof loginSchema>) => {
        console.log(data)
    }
    return (
        <div className="flex justify-center items-center gap-2">
            <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <FieldSet>
                    <FieldLabel>Login</FieldLabel>
                    <FieldDescription>Enjoy the best of this journaling app</FieldDescription>
                    <FieldGroup>
                        <Controller name="email" control={control} render={({field, fieldState, formState}) => (
                            <Field data-invalid={formState.isSubmitted && fieldState.invalid}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={formState.isSubmitted && fieldState.invalid}
                                    disabled={formState.isSubmitted && fieldState.isValidating}
                                    id="name"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                />
                                {formState.isSubmitted && fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}/>
                        <Controller name="password" control={control} render={({field, fieldState, formState}) => (
                            <Field data-invalid={formState.isSubmitted && fieldState.invalid}>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="password"
                                    {...field}
                                    aria-invalid={formState.isSubmitted && fieldState.invalid}
                                    disabled={formState.isSubmitted && fieldState.isValidating}
                                />
                                {formState.isSubmitted && fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}/>
                        <Field>
                            <Button type="submit" form="loginForm">Save</Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </form>
        </div>
    )
}