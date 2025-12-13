import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {TodayTreeView} from "@/app/(private)/[userId]/today/todayTreeView";
import {getAllUserTasks, getUserProfile} from "@/app/lib/actions";
import {Badge} from "@/components/ui/badge";
import {CoinsIcon, Gem, PlusIcon} from "lucide-react";

export default async function Today() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const userProfile = await getUserProfile(data.user.id)

    const allTasks = await getAllUserTasks(data.user.id)

    if (!userProfile) return null

    return (
        <>
            <Card className="h-[80vh]">
                <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex justify-between items-center text-2xl">
                        Your Tasks
                        <div className="flex items-center gap-2">
                            <Badge className="bg-primary">{allTasks && allTasks.reduce((acc, curr) => {
                                if (curr.isComplete && curr.value) {
                                    acc+= curr.value;
                                }
                                return acc
                            }, 0)}
                                <Gem />
                            </Badge>
                            <Badge className="bg-sky-600">{allTasks && allTasks.reduce((acc, curr) => {
                                if (!curr.isComplete && curr.value) {
                                    acc+= curr.value;
                                }
                                return acc
                            }, 0)}
                                <PlusIcon />
                            </Badge>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                    <TodayTreeView user={userProfile} userId={data.user.id} />
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </>
    )
}