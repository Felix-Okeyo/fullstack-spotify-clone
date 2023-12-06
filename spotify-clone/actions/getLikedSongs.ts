//this action fetches liked songs from currently logged in user
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: cookies
    });

    const {
      data: {
        session
      }
    } = await supabase.auth.getSession();

    // fetch songs using sql query from the liked-songs table, those in public, 
    // and belonging to a specific user with the identified session
    const { data, error } = await supabase
    .from('liked_songs').select('*, songs(*)').eq('user_id', session?. user?.id).order('created_at', { ascending: false })

    //handle error 
    if (error) {
        console.log(error.message);
        return [];
      }

    if (!data) {
      return [];
    }

      return data.map((item)=>({
        ...item.songs
      }))
      
    }

export default getLikedSongs;