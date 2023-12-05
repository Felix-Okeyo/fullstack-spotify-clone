"use client";

import {FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal';
import { useState } from 'react';
import Input from './Input';

function UploadModal() {

    const uploadModal = useUploadModal();
    const {register,handleSubmit,reset} = useForm<FieldValues>({
        defaultValues: {
            author:'',
            title:'',
            song: null,
            image: null,
        }
    }); 
    const [isLoading, setIsLoading ] = useState();

    const onChange = (open: boolean) => {
        if(!open){
            // Reset/roll back the form
            reset();

            uploadModal.onClose();
        }

    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload song to supabase server

    }

  return (
    <Modal title="Add a song"
        description='Upoload an mp3 file'
        isOpen ={uploadModal.isOpen}
        onChange={onChange}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input 
            id ='title'
            disabled ={isLoading}
            {...register('title', { required: true })}
            placeholder ="Song title"
            />

        </form>
    </Modal>
  )
}

export default UploadModal