import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Settings } from "./settings";
export default async function SettingsPage() {
    const supabase = await createClient()

    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/login')
    } else if (userData.user.app_metadata.role === "member") {
        redirect(`/${userData.user.app_metadata.organisation_id}/dashboard`)
    }

    return <>
        <h1 className="px-2 font-semibold text-2xl">Settings</h1>
        <Settings organisationId={userData.user.app_metadata.organisation_id} />
    </>
}