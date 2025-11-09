import {Entries} from "@/app/(private)/[userId]/dashboard/entries";
import {Button} from "@/components/ui/button";
import {logout} from "@/app/lib/actions";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";
export default async function Dashboard() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return <div>
        {/*<Button onClick={logout}>Logout</Button>*/}
        {/*<Button>*/}
        {/*    <Link href={`/${data.user.id}/profile`}>Profile</Link>*/}
        {/*</Button>*/}
        <Entries id={data.user.id} />
    </div>
}