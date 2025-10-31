import { createClient } from '@/lib/supabase/server';

export default async function Dashboard() {
    const supabase = await createClient();
    const {data: entries} = await supabase.from("entries").select(
        `
        id,
        entryText: entry_text,
    `
    );
    console.log("Entries loaded", entries && entries[0]);
    return <>
        {/*{entries && entries.length > 0 && (<p>{entries[0].entryText}</p>)}*/}
    </>
}