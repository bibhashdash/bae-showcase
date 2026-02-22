"use client"

import { useEffect, useState } from "react"
import { getAllClubMembers, getOrganisation, updateOrganisationRideSettings } from "@/lib/supabase/api"
import { Organisation, terrainOptions, User } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, X } from "lucide-react"

export const Settings = ({ organisationId }: { organisationId: string }) => {
    const [settings, setSettings] = useState<Organisation | null>(null)
    const [clubMembers, setClubMembers] = useState<Array<User> | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [selectionModal, setSelectionModal] = useState<{
        title: string,
        selectionOptions: Array<{ label: string, value: string }>,
        confirmCallback: (value: string) => void
    } | null>(null)
    const [selectedValue, setSelectedValue] = useState<string | null>(null)
    const [textInputModal, setTextInputModal] = useState<boolean>(false)
    const [textInputValue, setTextInputValue] = useState<string>('')
    const [rideLeaders, setRideLeaders] = useState<Array<string>>([])
    const [ridePaces, setRidePaces] = useState<Array<string>>([])
    const [rideTerrains, setRideTerrains] = useState<Array<string>>([])

    useEffect(() => {
        getOrganisation(organisationId).then(data => {
            setSettings(data)
            setRideLeaders(data.rideLeaders ?? [])
            setRidePaces(data.ridePaces ?? [])
            setRideTerrains(data.rideTerrains ?? [])
        })
        getAllClubMembers().then(members => setClubMembers(members.filter(m => m.isRideLeader)))
    }, [organisationId])

    if (!settings) return null

    const handleCancel = () => {
        setRideLeaders(settings.rideLeaders ?? [])
        setRidePaces(settings.ridePaces ?? [])
        setRideTerrains(settings.rideTerrains ?? [])
        setIsEditing(false)
    }

    const handleSave = async () => {
        await updateOrganisationRideSettings(organisationId, rideLeaders, ridePaces, rideTerrains)
        setSettings({ ...settings, rideLeaders, ridePaces, rideTerrains })
        setIsEditing(false)
    }

    return (
        <div className="pt-2">
            <Dialog open={selectionModal !== null} onOpenChange={(open) => { if (!open) { setSelectionModal(null); setSelectedValue(null) } }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectionModal?.title}</DialogTitle>
                    </DialogHeader>
                    <Select onValueChange={setSelectedValue}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectionModal?.selectionOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => { setSelectionModal(null); setSelectedValue(null) }}>Cancel</Button>
                        <Button onClick={() => { if (selectedValue) selectionModal?.confirmCallback(selectedValue); setSelectionModal(null); setSelectedValue(null) }}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={textInputModal} onOpenChange={(open) => { if (!open) { setTextInputModal(false); setTextInputValue('') } }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a ride pace option</DialogTitle>
                    </DialogHeader>
                    <Input value={textInputValue} onChange={(e) => setTextInputValue(e.target.value)} placeholder="e.g. A, B, C" />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => { setTextInputModal(false); setTextInputValue('') }}>Cancel</Button>
                        <Button onClick={() => { setRidePaces(prev => [...prev, textInputValue]); setTextInputModal(false); setTextInputValue('') }}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col gap-4 px-2 py-4">
                <div>
                    <p className="font-semibold">Name</p>
                    <p>{settings.name}</p>
                </div>
                <div>
                    <p className="font-semibold">Address</p>
                    <p>{settings.address}</p>
                </div>
                <div>
                    <p className="font-semibold">Email</p>
                    <p>{settings.email}</p>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-4 px-2 py-4">
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-lg">Ride settings</p>
                    {!isEditing && <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>}
                </div>
                <div>
                    <div className="flex gap-2">
                        <p className="font-semibold">Ride Leaders</p>
                        {isEditing && clubMembers && clubMembers.length > 0 &&
                            <PlusCircle
                                onClick={() => setSelectionModal({
                                    title: 'Add a ride leader',
                                    selectionOptions: clubMembers.map(item => ({ label: item.fullName, value: item.userId })),
                                    confirmCallback: (value) => setRideLeaders(prev => [...prev, value])
                                })}
                                role="button" className="cursor-pointer"
                            />
                        }
                    </div>
                    <div className="flex flex-wrap gap-3 mt-1 pt-3 pr-3">
                        {rideLeaders.length > 0
                            ? rideLeaders.map((item, index) => (
                                <Badge key={index} variant="default" className="relative overflow-visible px-4 py-2 text-sm">
                                    {item}
                                    {isEditing && (
                                        <button
                                            onClick={() => setRideLeaders(prev => prev.filter((_, i) => i !== index))}
                                            className="absolute -top-3 -right-3 size-6 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-900 cursor-pointer"
                                        >
                                            <X className="size-3.5" />
                                        </button>
                                    )}
                                </Badge>
                            ))
                            : <i className="text-sm">You have no ride leaders set</i>
                        }
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <p className="font-semibold">Ride Paces</p>
                        {isEditing && <PlusCircle onClick={() => setTextInputModal(true)} role="button" className="cursor-pointer" />}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-1 pt-3 pr-3">
                        {ridePaces.length > 0
                            ? ridePaces.map((item, index) => (
                                <Badge key={index} variant="default" className="relative overflow-visible px-4 py-2 text-sm">
                                    {item}
                                    {isEditing && (
                                        <button
                                            onClick={() => setRidePaces(prev => prev.filter((_, i) => i !== index))}
                                            className="absolute -top-3 -right-3 size-6 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-900 cursor-pointer"
                                        >
                                            <X className="size-3.5" />
                                        </button>
                                    )}
                                </Badge>
                            ))
                            : <i className="text-sm">You have no ride paces set</i>
                        }
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <p className="font-semibold">Ride Terrains</p>
                        {isEditing &&
                            <PlusCircle
                                onClick={() => setSelectionModal({
                                    title: 'Add a terrain option',
                                    selectionOptions: ["Road", "Mountain", "Gravel", "Cycle touring", "Bikepacking", "BMX", "Track"].map(t => ({ label: t, value: t.trim().toLowerCase() })),
                                    confirmCallback: (value) => setRideTerrains(prev => [...prev, value])
                                })}
                                role="button" className="cursor-pointer"
                            />
                        }
                    </div>
                    <div className="flex flex-wrap gap-3 mt-1 pt-3 pr-3">
                        {rideTerrains.length > 0
                            ? rideTerrains.map((item, index) => (
                                <Badge key={index} variant="default" className="relative overflow-visible px-4 py-2 text-sm">
                                    {item}
                                    {isEditing && (
                                        <button
                                            onClick={() => setRideTerrains(prev => prev.filter((_, i) => i !== index))}
                                            className="absolute -top-3 -right-3 size-6 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-900 cursor-pointer"
                                        >
                                            <X className="size-3.5" />
                                        </button>
                                    )}
                                </Badge>
                            ))
                            : <i className="text-sm">You have no ride terrains set</i>
                        }
                    </div>
                </div>
                {isEditing && (
                    <div className="flex gap-2 pt-2">
                        <Button onClick={handleSave}>Save</Button>
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    </div>
                )}
            </div>
        </div>
    )
}
