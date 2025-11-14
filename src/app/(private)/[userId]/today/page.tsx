import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {TodayTabbedView} from "@/app/(private)/[userId]/today/TodayTabbedView"
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
        <Card className="h-[80vh]">
            <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        Welcome to today!
                        <CardDescription>
                            It&#39;s going to be awesome
                        </CardDescription>
                    </div>
                    <Button>Add Task <CirclePlus /></Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="">
                {/*<TodayTabbedView userId={data.user.id} />*/}
                <TodayTreeView userId={data.user.id} />
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}