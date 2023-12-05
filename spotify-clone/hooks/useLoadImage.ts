import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  //check if there is a song
  if (!song) {
    return null;
  }

    //get the image data or url and remap it 
  const { data: imageData } = supabaseClient.storage.from('images').getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;