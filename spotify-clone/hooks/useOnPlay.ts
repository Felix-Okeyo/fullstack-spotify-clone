//loads the song to the usePlayer in order for the usePlayer to load to the player

import { Song } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";


const useOnPlay = (songs: Song[]) => {
    
  const SubscribeModal = useSubscribeModal();
  //get and mount to the player
  const player = usePlayer();
    
  //gets the authmodal to prevent non-user from playing
  const authModal = useAuthModal();

  //gets the user trying to play the music
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    
    //for users force them to auth and sub
    if (!user) {
      return authModal.onOpen();
    }
    //if not subscribed sub as well 
    if(!subscription){
      return SubscribeModal.onOpen();
    }


    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  //return the reusable hook that allows the user to load up anysong that he clicks to the player
  // and equally add the song to a playlist in a respective page
  return onPlay;
};

export default useOnPlay;