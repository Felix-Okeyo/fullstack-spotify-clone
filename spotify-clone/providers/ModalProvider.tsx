"use client";

import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";


const ModalProvider=()=>{
    
    //handle server side rendering by return a null to prevent errors in the client side 
    //rendering using useEffect and state

    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }

    return (
        <>
          <AuthModal />
          <UploadModal />
        </>
      );

}


export default ModalProvider;