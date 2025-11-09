"use client"

import {createClient} from "@/lib/supabase/client";
import {useEffect, useState} from "react";
import {getUserProfile} from "@/lib/supabase/api";
// import {User} from "@/lib/utils";

export const Entries = ({id}: {id: string}) => {
    // const [user, setUser] = useState<User | null>(null);
    // const supabase = createClient();
    //
    // useEffect(() => {
    //     getUserProfile(id).then(result => {
    //         setUser(result !== undefined ? result : null)
    //     });
    // }, [id, supabase]);

    return <div>
        {/*<p>{user?.fullName}</p>*/}
        {/*<p>{user?.bio}</p>*/}
    </div>
}