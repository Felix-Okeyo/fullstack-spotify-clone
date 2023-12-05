"use client";

import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal';

function UploadModal() {

    const uploadModal = useUploadModal();
    const onChange = (open: boolean) => {
        if(!open){
            // Reset/roll back the form
            uploadModal.onClose();
        }

    }

  return (
    <Modal title="Add a song"
        description='Upoload an mp3 file'
        isOpen ={uploadModal.isOpen}
        onChange={onChange}>
        Form
    </Modal>
  )
}

export default UploadModal