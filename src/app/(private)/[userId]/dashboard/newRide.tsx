"use client";
import {useState} from "react";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {RideFormSchema} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea"
import {ChevronDownIcon} from "lucide-react"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {addRide} from "@/lib/supabase/api";
import {Switch} from "@/components/ui/switch";

export const NewRide = ({}) => {
    const [open, setOpen] = useState(false)

    const {control, handleSubmit} = useForm<RideFormSchema>({
        mode: "onSubmit",
    })
    const onSubmit = async (data: RideFormSchema) => {
        await addRide(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} name="login-form" className="overflow-hidden overflow-y-auto">
            <FieldGroup>
                <Controller name="date" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="date">Date</FieldLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date-picker"
                                    className="w-32 justify-between font-normal"
                                >
                                    {field.value ? new Intl.DateTimeFormat("en-GB").format(new Date(field.value)): "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={new Date(field.value)}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        console.log(date, typeof date)
                                        field.onChange(date)
                                        setOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Controller name="time" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="time">Time</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="time"
                            type="time"
                            step="1"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Controller name="title" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="title"
                            placeholder="Enter a title"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Controller name="start" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="start">Start</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="start"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Controller name="destination" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="destination">Destination</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="destination"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Controller name="routeUrl" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="routeUrl">Route link</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            id="routeUrl"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Controller name="pace" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="pace">Pace</FieldLabel>
                        <Select {...field}
                                value={field.value}
                                aria-invalid={fieldState.invalid}
                                name="pace"
                                onValueChange={v => field.onChange(v)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue defaultValue={field.value} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="white">White</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                                <SelectItem value="amber">Amber</SelectItem>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="black">Black</SelectItem>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Controller name="description" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="" htmlFor="description">Description</FieldLabel>
                        <Textarea
                            id="description"
                            placeholder="Enter a description"
                            {...field}
                            aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Controller name="isOfficialClubRide" control={control} render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="" htmlFor="official-club-ride">Description</FieldLabel>
                        <Switch id="official-club-ride" />
                        {/*<Textarea*/}
                        {/*    id="description"*/}
                        {/*    placeholder="Enter a description"*/}
                        {/*    {...field}*/}
                        {/*    aria-invalid={fieldState.invalid}*/}
                        {/*/>*/}
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}/>
                <Field className="w-full">
                    <Button className="cursor-pointer " size={"lg"} type="submit">
                        Post
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}