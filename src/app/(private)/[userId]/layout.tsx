import {ReactNode} from "react";
import {AppSidebar} from "@/components/ui/appSidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {CustomSidebarTrigger} from "@/components/ui/customSIdebarTrigger";
import {SignOutButton} from "@/components/ui/SIgnOut";
import {getUserProfile} from "@/app/lib/actions";

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
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar user={userProfile} />
            <SidebarInset>
                <main className="w-full">
                    <header
                        className="sticky top-0 z-10 flex h-16 items-center border-b border-b-border justify-between bg-background px-6">
                        <CustomSidebarTrigger />
                        <SignOutButton />
                    </header>
                    <div className="py-1 md:p-3 w-full">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}