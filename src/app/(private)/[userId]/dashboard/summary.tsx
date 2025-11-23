"use client"
import {useEffect, useState} from "react";
import {getAllUserTasks} from "@/lib/supabase/api";
import {Task} from "@/lib/utils";
import {Item} from "@/components/ui/item";

export const Summary = ({userId}: { userId: string }) => {
    const [tasks, setTasks] = useState<Array<Task>>([]);

    useEffect(() => {
        getAllUserTasks(userId).then(result => setTasks(result));
    }, [])
    return (
        <div className="w-full h-full">
            {
                tasks.length > 0
                    ? <div className="flex gap-2 justify-center">
                        <Item className="flex flex-col">
                            <p className="text-6xl">{tasks.reduce((acc, task) => {
                                if (task.isComplete) acc++
                                return acc
                            }, 0)}
                            </p>
                            <p>Tasks completed</p>
                        </Item>
                        <Item className="flex flex-col">
                            <p className="text-6xl">{tasks.reduce((acc, task) => {
                                if (!task.isComplete) acc++
                                return acc
                            }, 0)}</p>
                            <p>Tasks In Progress</p>
                        </Item>
                    </div>
                    : <div></div>

            }
        </div>
    )
}