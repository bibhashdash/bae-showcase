import {Task} from "@/lib/utils";
import {createClient} from "@/lib/supabase/client";
import {error} from "next/dist/build/output/log";

export const signOut = async(): Promise<void> => {
    const supabase = createClient();
    await supabase.auth.signOut();
}

export const updateUserTask = async(task: Task): Promise<void> => {
    const supabase = createClient();
    try {
        const { data, error, status } = await supabase
            .from('tasks')
            .update({title: task.title, description: task.description, is_complete: task.isComplete, deadline: task.deadline, assigned_to: task.assignedTo})
            .eq('id', task.id)
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error updating task');
        }
        if (!data) {

            throw new Error('Error updating task');
        }
    } catch (err) {
        console.log(error);
        // throw new Error('Error updating task');
    }
}

export const addUserTask = async(task: Task): Promise<Task> => {
    const supabase = createClient();
    try {
        const { data, error, status } = await supabase
            .from('tasks')
            .insert({title: task.title, description: task.description, is_complete: task.isComplete, deadline: task.deadline, assigned_to: task.assignedTo})
            .select(`id: id, userId: user_id, title: title, description: description, assignedTo: assigned_to, isComplete: is_complete, deadline: deadline`)
            .single()
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error adding task');
        }
        if (!data) {

            throw new Error('Error adding task');
        }
        return data
    } catch (err) {
        console.log(error);
        throw new Error('Error adding task');
    }
}

export const deleteUserTask = async(id: string): Promise<void> => {
    const supabase = createClient();
    try {
        await supabase
        .from('tasks')
            .delete()
        .eq('id', id)
    } catch (err) {
        throw err;
    }
}

export const markTaskCompletion = async(id: string, isComplete: boolean): Promise<void> => {
    const supabase = createClient();
    try {
        const { data, error, status } = await supabase
            .from('tasks')
            .update({is_complete: isComplete})
            .eq('id', id)
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error updating task');
        }
        if (!data) {

            throw new Error('Error updating task');
        }
    } catch (err) {
        console.log(error);
        // throw new Error('Error updating task');
    }
}