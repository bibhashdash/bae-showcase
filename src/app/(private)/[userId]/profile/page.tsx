import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {getUserProfile} from "@/lib/supabase/api";
import {resolveUrl} from "next/dist/lib/metadata/resolvers/resolve-url";
import {UserProfileForm} from "@/components/ui/userProfileForm";
export default async function Profile() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Your Details {}
                </CardTitle>
                <CardDescription>
                    View and edit your personal information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <UserProfileForm userId={data.user.id} />
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}