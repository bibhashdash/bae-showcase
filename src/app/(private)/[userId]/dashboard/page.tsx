import {Entries} from "@/app/(private)/[userId]/dashboard/entries";

export default async function Dashboard({params}: {params: Promise <{userId: string}>}) {
    const {userId} = await params

    return <div>
        <Entries id={userId} />
    </div>
}