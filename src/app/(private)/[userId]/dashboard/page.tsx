import {Entries} from "@/app/(private)/[userId]/dashboard/entries";
import {Button} from "@/components/ui/button";
import {logout} from "@/app/lib/actions";

export default async function Dashboard({params}: {params: Promise <{userId: string}>}) {
    const {userId} = await params

    return <div>
        <Button onClick={logout}>Logout</Button>
        <Entries id={userId} />
    </div>
}