import {ReactNode} from "react";
import {AppSidebar} from "@/components/ui/appSidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {CustomSidebarTrigger} from "@/components/ui/customSIdebarTrigger";
import {SignOutButton} from "@/components/ui/SIgnOut";
import {getUserProfile} from "@/app/lib/actions";
import {TabbedMenu} from "@/components/ui/tabbedMenu";
import {AppHeader} from "@/components/ui/appHeader";

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
        <main className="w-full h-full">
            <AppHeader organisationId={data.user.app_metadata.organisation_id} />
            <div className="py-1 md:p-3 w-full">
                {children}
            </div>
            <TabbedMenu user={data.user} />
        </main>
    )
}