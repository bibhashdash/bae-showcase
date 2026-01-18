import {RideFormSchema, User} from "@/lib/utils";
import {createClient} from "@/lib/supabase/client";
import {error} from "next/dist/build/output/log";

export const signOut = async(): Promise<void> => {
    const supabase = createClient();
    await supabase.auth.signOut();
}

export const getAllRides = async(): Promise<Array<RideFormSchema>> => {
    const supabase = createClient();

    try {
        const { data, error, status } = await supabase
            .from('rides')
            .select(`id: id, userId: user_id, title: title, description: description, time: time, start: start, destination: destination, routeUrl: route_url, attendanceList: attendance_list(user_id), pace: pace, distance: distance, isOfficialClubRide: is_official_club_ride, date: date)`)
            .order('title', {ascending: true})
        if (error) {
            console.log(error);
            throw new Error('Error fetching rides');
        }
        if (!data) {
            throw new Error('Error fetching rides');
        }
        const rides = data as unknown
        // @ts-ignore
        return rides.map(
            (item: { attendanceList: any[]; }) => ({
                ...item,
                attendanceList: item.attendanceList.map((attendance) => attendance.user_id)
            })
        )
    } catch (err) {
        console.error('Validation or Connection Error:', err);
        throw err;
    }
}

export const getAllClubMembers = async(): Promise<Array<User>> => {
    const supabase = createClient();

    try {
        const { data, error, status } = await supabase
            .from('profiles')
            .select(`id: id, userId: user_id, fullName: full_name, username: username, bio: bio, userRole: user_role, organisationId: organisation_id`)

        //   .returns<Array<MyType>>()
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
        const { data, error, status } = await supabase
            .from('rides')
            .insert({title: ride.title, description: ride.description, time: ride.time, date: ride.date, start: ride.start, destination: ride.destination, route_url: ride.routeUrl, pace: ride.pace, distance: ride.distance, is_official_club_ride: ride.isOfficialClubRide, leader: ride.leader, organisation_id: ride.organisationId})
            .select(`id: id, userId: user_id, title: title, description: description, time: time, start: start, destination: destination, routeUrl: route_url, attendanceList: attendance_list(user_id), pace: pace, distance: distance, isOfficialClubRide: is_official_club_ride`)
            .single()
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error adding task');
        }
        if (!data) {

            throw new Error('Error adding task');
        }

        const formattedData = {
            ...data,
            attendanceList: data.attendanceList?.map((item: any) => item.user_id) || []
        };

        return formattedData as unknown as RideFormSchema;
    } catch (err) {
        console.log(error);
        throw new Error('Error adding task');
    }
}

export const getRide = async (rideId: string): Promise<RideFormSchema> => {
    const supabase = createClient();
    try {
        const {data, error, status} = await supabase
            .from('rides')
            .select(`id: id, userId: user_id, title: title, description: description, time: time, start: start, destination: destination, attendanceList: attendance_list(user_id), routeUrl: route_url, pace: pace, distance: distance, isOfficialClubRide: is_official_club_ride, date: date`)
            .eq("id", rideId)
            .single()
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error adding task');
        }
        if (!data) {

            throw new Error('Error adding task');
        }

        const formattedData = {
            ...data,
            attendanceList: data.attendanceList?.map((item: any) => item.user_id) || []
        };

        return formattedData as unknown as RideFormSchema;
    } catch(err) {
        console.error('Validation or Connection Error:', err);
        throw err;
    }
}

export const updateRideAttendance = async (isAttending: boolean, organisationId: string, userId: string, rideId: string) => {
    const supabase = createClient();
    try {
        if (isAttending) {
            const { data, error, status } = await supabase
                .from('attendance_list')
                .insert({ride_id: rideId, user_id: userId, organisation_id: organisationId})
            if (error && status !== 406) {
                console.log(error);
                throw new Error('Error updating task');
            }
            return data
        }
        else {
            const { data, error, status } = await supabase
                .from('attendance_list')
                .delete()
                .match(
                    {
                        ride_id: rideId,
                        user_id: userId,
                    }
                )

            if (error && status !== 406) {
                console.log(error);
                throw new Error('Error updating task');
            }
            return data
        }

    } catch(err) {
        console.error('Validation or Connection Error:', err);
        throw err;
    }
}