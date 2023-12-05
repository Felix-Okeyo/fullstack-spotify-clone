import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: cookies
    });
    
    //get sessions to identify the user
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    //handle error message and return empty array
    if (sessionError) {
        console.log(sessionError.message);
        return [];
      }
    
    // fetch the specific songs by user 
    const { data, error } = await supabase
    .from('songs').select('*').eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false })

    //handle error when fetching the song
    if (error) {
        console.log(error.message);
      }

    // if no errors then return the song as it was saved
    return (data as any) || [];
}

export default getSongsByUserId;