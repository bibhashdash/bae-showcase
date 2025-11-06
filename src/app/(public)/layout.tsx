import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {ReactNode} from "react";

export default async function Layout({children}: {children: ReactNode}) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (!error && data && data.user) {
        redirect(`/${data.user.id}/dashboard`)
    }

    return (

            <div className="flex min-h-screen justify-center items-center gap-2 h-full">
                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>

    )
}
