import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  //get song and assign title or leave undefined \
  const [song, setSong] = useState<Song | undefined>(undefined);
  
  //extract supabaseclient from supabase and initialise their session for easier auth when now
  // loading the song as opposed redoing it in the useLoadSongById
  const { supabaseClient } = useSessionContext();

  //useEffect, check id if not leave it null. 
  useEffect(() => {
    if (!id) {
      return;
    }

    //if id is there set is loading as true, 
    setIsLoading(true);

    //fetch the song from songs table use sql query
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs').select('*').eq('id', id).single();

        //handle error
      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      
      //if not error, return song and stop loading immediately
      setSong(data as Song);
      setIsLoading(false);
    }

    //call the fetchSong fetch function
    fetchSong();
  }, [id, supabaseClient]);


  //return useMemo to safely memorise things from this hook 
  return useMemo(() => (
        {
        isLoading,
        song
        }
    ), [isLoading, song]);
};

export default useSongById;