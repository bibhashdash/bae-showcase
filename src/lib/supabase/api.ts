import {Attendee, Organisation, RideFormSchema, User} from "@/lib/utils";
import {createClient} from "@/lib/supabase/client";

export const signOut = async(): Promise<void> => {
    const supabase = createClient();
    await supabase.auth.signOut();
}

export const getOrganisation = async(organisationId: string): Promise<Organisation> => {
    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('organisations')
            .select(`name, address, email, rideLeaders: ride_leaders, ridePaces: ride_paces, rideTerrains: ride_terrains`)
            .eq('id', organisationId)
            .single()
        if (error) {
            console.log(error);
            throw new Error('Error fetching organisation');
        }
        if (!data) {
            throw new Error('Error fetching organisation');
        }
        return data as unknown as Organisation;
    } catch (err) {
        console.error('Validation or Connection Error:', err);
        throw err;
    }
}

export const getAllRides = async(): Promise<Array<RideFormSchema>> => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
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

        type RawAttendance = { user_id: string };
        type RawRide = { attendanceList: RawAttendance[] } & Record<string, unknown>;
        const ridesData = data as unknown as RawRide[];

        const allUserIds = [...new Set(
            ridesData.flatMap(ride => ride.attendanceList.map((a: RawAttendance) => a.user_id))
        )];

        let profilesMap: Record<string, { fullName: string, username: string }> = {};
        if (allUserIds.length > 0) {
            const { data: profilesData } = await supabase
                .from('profiles')
                .select('user_id, full_name, username')
                .in('user_id', allUserIds);
            if (profilesData) {
                profilesMap = Object.fromEntries(
                    profilesData.map(p => [p.user_id, { fullName: p.full_name, username: p.username }])
                );
            }
        }

        return ridesData.map(item => ({
            ...item,
            attendanceList: item.attendanceList.map((a): Attendee => ({
                userId: a.user_id,
                fullName: profilesMap[a.user_id]?.fullName || '',
                username: profilesMap[a.user_id]?.username || '',
            }))
        })) as unknown as RideFormSchema[];
    } catch (err) {
        console.error('Validation or Connection Error:', err);
        throw err;
    }
}

export const getAllClubMembers = async(): Promise<Array<User>> => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select(`id: id, userId: user_id, fullName: full_name, username: username, bio: bio, userRole: user_role, organisationId: organisation_id, isRideLeader: is_ride_leader`)

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
            .insert({title: ride.title, ride_type: ride.rideType, description: ride.description, time: ride.time, date: ride.date, start: ride.start, destination: ride.destination, route_url: ride.routeUrl, pace: ride.pace, distance: ride.distance, is_official_club_ride: ride.isOfficialClubRide, leader: ride.leader, organisation_id: ride.organisationId})
            .select(`id: id, userId: user_id, title: title, rideType: ride_type, description: description, time: time, start: start, destination: destination, routeUrl: route_url, attendanceList: attendance_list(user_id), pace: pace, distance: distance, isOfficialClubRide: is_official_club_ride`)
            .single()
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error adding task');
        }
        if (!data) {

            throw new Error('Error adding task');
        }

        return { ...data, attendanceList: [] } as unknown as RideFormSchema;
    } catch (err) {
        console.log(err);
        throw new Error('Error adding task');
    }
}

export const getRide = async (rideId: string): Promise<RideFormSchema> => {
    const supabase = createClient();
    try {
        const {data, error, status} = await supabase
            .from('rides')
            .select(`id: id, userId: user_id, title: title, rideType: ride_type, description: description, time: time, start: start, destination: destination, attendanceList: attendance_list(user_id), routeUrl: route_url, pace: pace, distance: distance, isOfficialClubRide: is_official_club_ride, date: date`)
            .eq("id", rideId)
            .single()
        if (error && status !== 406) {
            console.log(error);
            throw new Error('Error adding task');
        }
        if (!data) {
            throw new Error('Error adding task');
        }
        
        const attendeeIds = (data.attendanceList).map(a => a.user_id);
        let attendeesArray: Array<Attendee> = [] 
        if (attendeeIds.length > 0) {
            const { data: profilesData } = await supabase
                .from('profiles')
                .select('user_id, full_name, username')
                .in('user_id', attendeeIds);
            if (profilesData) {
                attendeesArray = profilesData.reduce((acc, curr): Array<Attendee> => {
                    acc.push({
                        userId: curr.user_id,
                        fullName: curr.full_name,
                        username: curr.username
                    })
                    return acc
                }, [])
            }
        }

        const formattedData = {
            ...data,
            attendanceList: attendeesArray
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