import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";


const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: cookies
    });

    //check if there is no title
    if (!title) {
      const allSongs = await getSongs();
      return allSongs;
    }

    //fetch songs using sql query 
    const { data, error } = await supabase
    .from('songs').select('*').ilike('title',`%${title}%`).order('created_at', { ascending: false })

    //handle error 
    if (error) {
        console.log(error.message);
      }

      return (data as any) || []; //return the data as it is or as an empty array
}

export default getSongsByTitle;