"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps>=({
    song, 
    songUrl
})=>{
     //get the player loader
    const player = usePlayer();
     //set state for volume
    const [ volume, setVolume ] = useState(1);

    //display muted when volume at 0
    const VolumeIcon = volume==0 ? HiSpeakerXMark: HiSpeakerWave;
    
    //set another state for playing. default make it to not play song 
    const [isPlaying, setIsPlaying] = useState(false)

    //the user now has to click to play since default state is false
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;


    // onPlayNextfunction
    const onPlayNext =() =>{
        
        //if player has not songs dont do anything
        if (player.ids.length === 0) {
            return;
          }
      
          //if get index of song and compare to its active index
          const currentIndex = player.ids.findIndex((id) => id === player.activeId);
          //check whether their is a next song
          const nextSong = player.ids[currentIndex + 1];
          
          //if there is no next song, return the first song in the array. reset the index
          if (!nextSong) {
            return player.setId(player.ids[0]);
          }
        //otherwise just play then next song  
        player.setId(nextSong);
    };

    //playing the previous song
    const onPlayPrevious = () => {
        //check if there are songs to play
        if (player.ids.length === 0) {
          return;
        }
        
        //get the current song and check with its id
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        //check if there is a previous song to play
        const previousSong = player.ids[currentIndex - 1];
    
        //if there is no previous song or you are on the first one, just play the last song in the array
        if (!previousSong) {
          return player.setId(player.ids[player.ids.length - 1]);
        }
    
        player.setId(previousSong);
      }

    return ( 
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
              <div className="flex items-center gap-x-4">
                <MediaItem data={song} />
                <LikeButton songId={song.id} />
              </div>
            </div>
    
            <div 
              className="flex md:hidden col-auto w-full justify-end items-center">
              <div onClick={()=>{}} 
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
             
                <Icon size={30} className="text-black" />
              </div>
            </div>
    
            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
              <div>
                    <AiFillStepBackward onClick={onPlayPrevious} size={30} 
                        className="text-neutral-400 cursor-pointer hover:text-white transition"/>
              </div>
              <div onClick={()=>{}} 
                 className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
                
                    <Icon size={30} className="text-black" />
              </div>
              <div>
                    <AiFillStepForward onClick={onPlayNext} size={30} 
                    className="text-neutral-400 cursor-pointer hover:text-white transition" />
              </div>
             
            </div>
    
            <div className="hidden md:flex w-full justify-end pr-2">
              <div className="flex items-center gap-x-2 w-[120px]">
                 <VolumeIcon onClick={()=>{}} className="cursor-pointer" size={34} /> 
                <Slider onChange={()=>{}} /> 
              </div>
            </div>
    
          </div>
       );

}


export default PlayerContent;