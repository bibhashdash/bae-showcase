import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getAllUserTasks, getUserProfile} from "@/app/lib/actions";

export default async function Dashboard() {
    const supabase = await createClient()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/login')
    }

    const tasks = await getAllUserTasks(userData.user.id)

    const userProfile = await getUserProfile(userData.user.id)
    return <>
        <Card className="h-[80vh]">
            <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex justify-between items-center text-2xl">
                    Dashboard
                </CardTitle>
            </CardHeader>
            <CardContent className="h-full">

            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    </>
}