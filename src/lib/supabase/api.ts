import {RideFormSchema, User} from "@/lib/utils";
import {createClient} from "@/lib/supabase/client";
import {error} from "next/dist/build/output/log";

export const signOut = async(): Promise<void> => {
    const supabase = createClient();
    await supabase.auth.signOut();
}

export const getAllRides = async(organisationId: string): Promise<Array<RideFormSchema>> => {
    const supabase = createClient();

    try {
        const { data, error, status } = await supabase
            .from('rides')
            .select(`id: id, userId: user_id, title: title, description: description, time: time, start: start, destination: destination, routeUrl: route_url, attendanceList: attendance_list, pace: pace, distance: distance, isOfficialClubRide: is_official_club_ride, date: date)`)
            .eq("organisation_id", organisationId)
        if (error) {
            console.log(error);
            throw new Error('Error fetching rides');
        }
        if (!data) {

            throw new Error('Error fetching rides');
        }
        return (data as unknown as RideFormSchema[]) || [];
    } catch (err) {
        console.error('Validation or Connection Error:', err);
        throw err;
    }
}

export const getAllClubMembers = async(organisationId: string): Promise<Array<User>> => {
    const supabase = createClient();

    try {
        const { data, error, status } = await supabase
            .from('profiles')
            .select(`id: id, userId: user_id, fullName: full_name, username: username, bio: bio, userRole: user_role, organisationId: organisation_id`)
            .eq("organisation_id", organisationId)
        if (error) {
            console.log(error);
            throw new Error('Error fetching rides');
        }
        if (!data) {

            throw new Error('Error fetching rides');
        }
        return (data as unknown as User[]) || [];
    } catch (err) {
        console.error('Validation or Connection Error:', err);
        throw err;
    }
}

export const addRide = async(ride: RideFormSchema): Promise<RideFormSchema> => {
    const supabase = createClient();
    try {
        console.log(ride)
        const { data, error, status } = await supabase
            .from('rides')
            .insert({title: ride.title, description: ride.description, time: ride.time, date: ride.date, start: ride.start, destination: ride.destination, route_url: ride.routeUrl, pace: ride.pace, distance: ride.distance, is_official_club_ride: ride.isOfficialClubRide, leader: ride.leader, organisation_id: ride.organisationId})
            .select(`id: id, userId: user_id, title: title, description: description, time: time, start: start, destination: destination, routeUrl: route_url, attendanceList: attendance_list, pace: pace, distance: distance, isOfficialClubRide: is_official_club_ride) `)
            .single()
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error adding task');
        }
        if (!data) {

            throw new Error('Error adding task');
        }
        return data as unknown as RideFormSchema
    } catch (err) {
        console.log(error);
        throw new Error('Error adding task');
    }
}