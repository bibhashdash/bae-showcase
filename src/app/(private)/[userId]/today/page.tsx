import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
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
                    <CardTitle className="flex justify-between items-center">
                        Welcome to today!
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