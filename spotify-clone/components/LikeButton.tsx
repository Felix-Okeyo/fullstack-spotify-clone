"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> =({
    songId
})=> {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [ isLiked, setIsLiked ] = useState(false);

    //create a useEffect to check current song whether is liked or not 
    // first check if the user is there, if not break the function immediately
    useEffect(() =>{
        if (!user?.id){
            return;
        }
        // if user exists, create function to fetch data from the liked-songs table in supabase server
        const fetchData = async() => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single();

            //handle error
            if (!error && data) {
                setIsLiked(true);
              }}
            //call the fetchData function at the end of the useEffect
            fetchData();

    }, [songId, supabaseClient, user?.id])

    //dynamically render the liked icon whether the song is like or not 
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    //handle likes on icon
    const handleLike = async () => {
        if (!user){
            return authModal.onOpen();
        }
        //if we already liked the song extract error, and remove it from liked. on and off thing.        
        if (isLiked) {
            const { error } = await supabaseClient
            .from('liked_songs')
            .delete()
            .eq('user_id', user.id)
            .eq('song_id', songId)
           
            // error handle 
            if (error) {
                toast.error(error.message);
              } else {
                setIsLiked(false) //manually set isLiked to false
              }
        } else {
            const { error } = await supabaseClient 
            .from('liked_songs')
            .insert({
            song_id: songId,
            user_id: user.id    
        });
        // if there was an error then throw it
        if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Liked');
            }
        }
        router.refresh();
    }

    
  return (
    <button title="like searched" onClick = {handleLike} className="hover:opacity-75 transition">
        <Icon color={isLiked ? '#22c55e' : 'white'} size ={25}/>
    </button>
  );
}

export default LikeButton;
