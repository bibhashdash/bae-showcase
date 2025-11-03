"use client"
import { createClient } from '@/lib/supabase/client';
// import { type User } from '@supabase/supabase-js'
import {useCallback, useEffect, useState} from "react";
import { useParams } from 'next/navigation'
import {User} from "@/lib/utils"

export default function Dashboard() {
    const supabase = createClient();
    const {userId} = useParams()
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)

    const getProfile = useCallback(async () => {
        try {
            setLoading(true)
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`id: user_id, username: username, fullName: full_name, bio: bio`)
                .eq('user_id', userId)
                .single()
                .overrideTypes<User | null>();
            if (error && status !== 406) {
                console.log(error)
                setLoading(false)
                throw error
            }
            if (data) {
                setUser(data)
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
    if (!user) return null;
    return <div>
        <p>{user.username}</p>
        <p>{user.bio}</p>
    </div>
}