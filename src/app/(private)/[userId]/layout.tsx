import {ReactNode} from "react";
import {AppSidebar} from "@/components/ui/appSidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Menu} from "lucide-react";
import {createClient} from "@/lib/supabase/server";

import {CustomSIdebarTrigger} from "@/components/ui/customSIdebarTrigger";
import {redirect} from "next/navigation";
import {Separator} from "@/components/ui/separator";

export default async function Layout({children}: { children: ReactNode }) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    return (
        <SidebarProvider>
            <AppSidebar userId={data.user.id} />
            <main className="w-full">
                <header className="sticky top-0 z-10 flex h-16 items-center border-b border-b-border gap-4cbg-background px-6">
                    {/*<CustomSIdebarTrigger />*/}

                    <SidebarTrigger className="ml-1"><Menu /></SidebarTrigger>
                    Hello this is the title section of each nav item
                </header>
                <div className="p-3 w-full">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}

