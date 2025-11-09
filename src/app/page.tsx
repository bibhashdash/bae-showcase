import {Button} from "@/components/ui/button";
import Link from "next/link";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function Home() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    else redirect(`/${data.user.id}/dashboard`)
}
