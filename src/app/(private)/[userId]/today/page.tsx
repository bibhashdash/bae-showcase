import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {TodayTabbedView} from "@/app/(private)/[userId]/today/TodayTabbedView"

export default async function Today() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <Card className="h-[80vh]">
            <CardHeader>
                <CardTitle>
                    Welcome to today!
                </CardTitle>
                <CardDescription>
                    It&#39;s going to be awesome
                </CardDescription>
            </CardHeader>
            <CardContent className="">
                <TodayTabbedView userId={data.user.id} />
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}