import { getUserProfile } from "@/app/lib/actions";
import { AppHeader } from "@/components/ui/appHeader";
import { TabbedMenu } from "@/components/ui/tabbedMenu";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export interface AuthUser {
    id: string | undefined;
    email?: string | undefined;
}
export default async function Layout({children}: { children: ReactNode }) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const userProfile = await getUserProfile(data.user.id);

    if (!userProfile) return null

    return (
        <main className="w-full h-dvh flex flex-col">
            <AppHeader organisationId={data.user.app_metadata.organisation_id} />
            <div className="flex-1 overflow-y-auto py-1 md:p-3 w-full">
                {children}
            </div>
            <TabbedMenu organisationId={data.user.app_metadata.organisation_id} role={data.user.app_metadata.role} />
        </main>
    )
}