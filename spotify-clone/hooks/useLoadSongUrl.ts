
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  //if no song return empty string
  if (!song) {
    return '';
  }
  //if there is a song get the path of the song in the database and its public path
  const { data: songData } = supabaseClient
    .storage.from('songs').getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;