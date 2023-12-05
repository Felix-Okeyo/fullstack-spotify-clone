import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: cookies
    });

    //fetch songs using sql query 
    const { data, error } = await supabase
    .from('songs').select('*').order('created_at', { ascending: false })

    //handle error 
    if (error) {
        console.log(error.message);
      }

      return (data as any) || []; //return the data as it is or as an empty array
}

export default getSongs;