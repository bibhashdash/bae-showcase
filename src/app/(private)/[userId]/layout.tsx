import {ReactNode} from "react";
import {AppSidebar} from "@/components/ui/appSidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {LogOutIcon, Menu} from "lucide-react";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
export interface AuthUser {
    id: string | undefined;
    email?: string | undefined;
}
export default async function Layout({children, params}: { children: ReactNode, params: Promise<any> }) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar user={data.user} />
            <SidebarInset>
                <main className="w-full">
                    <header
                        className="sticky top-0 z-10 flex h-16 items-center  border-b border-b-border justify-between bg-background px-6">
                        <SidebarTrigger className="ml-1"><Menu/></SidebarTrigger>
                        <Button variant={"secondary"}>Sign out<LogOutIcon size={16} /></Button>
                    </header>
                    <div className="p-3 w-full">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

