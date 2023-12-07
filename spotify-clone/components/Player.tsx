"use client";

import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./PlayerContent";

const Player = () => {
    //hooks
    const player = usePlayer();
    {/*you need to fetch the song id saved in the store under the usePlayer hook as 
        however, the problem is you are using hooks in a use client component
        All along the fetched songs have been through the server component 'createSearverComponentClient' in the 
        actions directory to fetch to supabase.
        However, supabase allows you to fetch data from the server in the client component and all the logic handled in the 
        actions directory could have been avoided. However, for flexibility, the actions directory covers fetching and 
        useEffects that make it easier to debug if need be.
        Therefore, useGetSongByID.ts hook was created
    */}
    
    //extract song and pass player.active id theres one
    const { song } = useGetSongById(player.activeId);

    // loading the song to be player
    const songUrl = useLoadSongUrl(song!);

    // error handle for no loaded song, no url, and no active id
    if (!song || !songUrl || !player.activeId) {
        return null;
      }
    
 
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
        
        <PlayerContent key ={songUrl}song ={song} songUrl={songUrl}/>
        
    </div>
  )
}

export default Player; 

{/*This component now executed the playing of the music and is wrapped in the player
    component 
    Assigning it a key allows it to be dynamic and be destroyed everytime you load or skip 
    to another song.
*/}
