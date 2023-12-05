"use client";

import {FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import uniqid from 'uniqid';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal';
import Input from './Input';
import Button from './Button';
import { useRouter } from 'next/navigation';



function UploadModal() {

    const uploadModal = useUploadModal();
    const [isLoading, setIsLoading ] = useState(false);
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();


    const {register,handleSubmit,reset} = useForm<FieldValues>({
        defaultValues: {
            author:'',
            title:'',
            song: null,
            image: null,
        }
    }); 
   
    const onChange = (open: boolean) => {
        if(!open){
            // Reset/roll back the form
            reset();

            uploadModal.onClose();
        }

    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload song to supabase server
        try {
            setIsLoading(true);
            // extract the values in the form field
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            // check missing values in the other form fields
            if (!imageFile || !songFile || !user){
                toast.error('Missing values');
                return; //will prevent the user from uploading an incomplete filled out song
            }

            //unique id to store songs
            const uniqueId = uniqid()
            
            //upload the song to supabase server
            const {
                data: songData,
                error: songError,
            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueId}`, songFile, 
            {
                cacheControl: '3600',
                upsert: false, 
            })
            // handle error uploading the song 
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed to upload song')
            }
            
            //upload image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueId}`, imageFile, 
            {
                cacheControl: '3600',
                upsert: false, 
            })

            // handle imgae upload error
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed to upload image ');
              }

            //if there were no image and song upload errors create a new entry in the database
            // use an sql query to add new entry to the database
            const { error: supabaseError } = await supabaseClient
            .from('songs').insert({
                                    user_id: user.id,
                                    title: values.title,
                                    author: values.author,
                                    image_path: imageData.path,
                                    song_path: songData.path
                                });
            
            // if there was an error in adding the new song to the db
            if (supabaseError) {
                return toast.error(supabaseError.message);
              }
            //however if everything went well then
            router.refresh(); // vital when listing the songs
            setIsLoading(false);
            toast.success('Song created successfully!');
            reset(); //reset the upload form
            uploadModal.onClose(); //close the upload component 
              
        } catch (error) {
            toast.error('Error uploading song')
        } finally {
            setIsLoading(false);
        }

    }

  return (
    <Modal title="Add a song"
        description='Upoload an mp3 file'
        isOpen ={uploadModal.isOpen}
        onChange={onChange}>
        <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-4'
        >
            <Input 
            id ='title'
            disabled ={isLoading}
            {...register('title', { required: true })}
            placeholder ="Song title"
            />
            <Input 
            id ='author'
            disabled ={isLoading}
            {...register('author', { required: true })}
            placeholder ="Song author"
            />
            <div>
                <div className='pb-1'>
                    Select a song file
                </div>
                <Input 
                    id ='song'
                    type ='file'
                    disabled ={isLoading}
                    accept='.mp3'
                    {...register('song', { required: true })}
                    />
                <div className='pb-1'>
                    Select an image
                </div>
                <Input 
                    id ='image'
                    type ='file'
                    disabled ={isLoading}
                    accept='image/*'
                    {...register('image', { required: true })}
                    />
            </div>
            <Button disabled={isLoading} type ='submit'>
                Create 
            </Button>
        </form>
    </Modal>
  )
}

export default UploadModal