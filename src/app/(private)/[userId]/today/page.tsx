import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {UserProfileForm} from "@/components/ui/userProfileForm";
import {TodaySummaryCards} from "@/app/(private)/[userId]/today/todaySummaryCards";

export default async function Today() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Welcome to today!
                </CardTitle>
                <CardDescription>
                    It&#39;s going to be awesome
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TodaySummaryCards userId={data.user.id} />
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}