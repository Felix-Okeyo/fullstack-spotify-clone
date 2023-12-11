"use client";

import {TbPlaylist} from "react-icons/tb" //playlist icon
import {AiOutlinePlus} from "react-icons/ai" // the + icon
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";


// create the props being songs, that are to be passed to the Library component
interface LibraryProps {
    songs: Song[];
}

//extract them and pass them to the component
const Library:React.FC<LibraryProps> = ({
    songs
})=> {
    const subscribeModal = useSubscribeModal()
    const authModal =  useAuthModal();
    const { user, subscription } = useUser();
    // add uploadmodel  hook here 
    const uploadModal = useUploadModal(); 

    const onClick = ()=> {
        //control if user is authenticated and logged in
        if (!user){
            return authModal.onOpen();
        }
        //check for subscriptions
        if(!user){
            return subscribeModal.onOpen();
        }

        return uploadModal.onOpen();
    }
    //add onplay functionality to songs in the library as well 
    const onPlay = useOnPlay(songs);


  return (
    <div className = "flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4">
            <div className=" inline-flex items-center gap-x-2">
                <TbPlaylist className='text-neutral-400' size = {26}/>
                <p className="text-neutral-400 font-medium text-md">Your Library</p>
            </div>
            <AiOutlinePlus onClick = {onClick} size ={20}
            className= "text-neutral-400 coursor-pointer hover:text-white transition"/>
        </div>
        <div className="flex flex-col gap-y-2 mt-4 px-3">
            {songs.map((item)=>(
                < MediaItem onClick={(id: string) => onPlay(id)} key ={item.id} data = {item}/>
            ))}

        </div>
    </div>
  )
}

export default Library