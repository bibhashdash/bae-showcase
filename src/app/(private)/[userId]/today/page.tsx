import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {TodayTreeView} from "@/app/(private)/[userId]/today/todayTreeView";

export default async function Today() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <>
            <Card className="h-[80vh]">
                <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex justify-between items-center text-2xl">
                        Your Tasks
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                    <TodayTreeView userId={data.user.id} />
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </>
    )
}