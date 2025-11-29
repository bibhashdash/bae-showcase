import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getAllUserTasks, getUserProfile} from "@/app/lib/actions";
import {ArrowRightLeft, ChevronRight, Gem, Gift} from "lucide-react";

export default async function Dashboard() {
    const supabase = await createClient()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData?.user) {
        redirect('/login')
    }

    const tasks = await getAllUserTasks(userData.user.id)

    const userProfile = await getUserProfile(userData.user.id)
    return <>
        <div className="h-[80vh] px-4 text-slate-700">
            <div className="">
                <div className="flex justify-between items-center text-2xl font-semibold">
                    Hello, {userProfile.fullName}!
                </div>
            </div>
            <div className="grid gap-y-2 py-4">
                <Card className="py-3 bg-primary text-white">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Gift />
                                <p>Make a Trade</p>
                            </div>
                            <ChevronRight />
                        </div>
                    </CardContent>
                </Card>
                <Card className="text-slate-700 border-none">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CardTitle><p>Gems</p></CardTitle>
                            <Gem size={24} stroke={"#01d1ff"}/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <p className="text-5xl font-semibold">60</p>
                            {/*<ArrowRightLeft size={36}/>*/}
                        </div>
                        <small>Complete more tasks to earn more gems!</small>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <Card className="border-none text-slate-700">
                        <CardHeader>
                            <CardTitle className="flex justify-center">
                                <p>Pending Tasks</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold text-center">
                            {
                                tasks.reduce((acc, curr) => {
                                    !curr.isComplete && acc++
                                    return acc
                                }, 0)
                            }
                        </CardContent>
                        <CardFooter className="flex justify-center text-xs">View</CardFooter>
                    </Card>
                    <Card className="border-none text-slate-700">
                        <CardHeader>
                            <CardTitle className="flex justify-center">
                                <p>Pending Trades</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold text-center">
                            {
                                tasks.reduce((acc, curr) => {
                                    !curr.isComplete && acc++
                                    return acc
                                }, 0)
                            }
                        </CardContent>
                        <CardFooter className="flex justify-center text-xs">View</CardFooter>
                    </Card>
                    <Card className="border-none text-slate-700">
                        <CardHeader>
                            <CardTitle className="flex justify-center">
                                <p>Finished Tasks</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold text-center">
                            {
                                tasks.reduce((acc, curr) => {
                                    !curr.isComplete && acc++
                                    return acc
                                }, 0)
                            }
                        </CardContent>
                        <CardFooter className="flex justify-center text-xs">View</CardFooter>
                    </Card>
                    <Card className="border-none text-slate-700">
                        <CardHeader>
                            <CardTitle className="flex justify-center">
                                <p>Finished Trades</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold text-center">
                            {
                                tasks.reduce((acc, curr) => {
                                    !curr.isComplete && acc++
                                    return acc
                                }, 0)
                            }
                        </CardContent>
                        <CardFooter className="flex justify-center text-xs">View</CardFooter>
                    </Card>
                </div>
                {/*<Summary userId={userData?.user.id} />*/}
            </div>
        </div>
    </>
}