"use client"
import { createClient } from '@/lib/supabase/client';
// import { type User } from '@supabase/supabase-js'
import {useCallback, useEffect, useState} from "react";
import { useParams } from 'next/navigation'
import {User} from "@/lib/utils"

export default function Dashboard() {
    const supabase = createClient();
    const {userId} = useParams()
    // const [user, setUser] = useState<User | null>({id: null, userName: null});
    const [userName, setUserName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [loading, setLoading] = useState(true)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`fullName: full_name, username, bio, userId: user_id`)
                .eq('user_id', userId)
                .single()
            if (error && status !== 406) {
                console.log(error)
                setLoading(false)
                throw error
            }
            if (data && data.userId) {
                // setFullname(data.full_name)
                // setUsername(data.username)
                // setWebsite(data.website)
                // setAvatarUrl(data.avatar_url)
                // setUser(data)
                setUserName(data.username)
                setBio(data.bio)
                setLoading(false)
                // console.log(data)
            }
        } catch (error) {
            alert('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [userId, supabase])

    useEffect(() => {
        if (userId !== undefined) {
            getProfile()
        }
    }, [userId, getProfile])

    return <>
        <p>{userName}</p>
        <p>{bio}</p>
        {/*{entries && entries.length > 0 && (<p>{entries[0].entryText}</p>)}*/}
    </>
}