"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";


function AuthModal() {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    // throw the authmodal onscreen when not open. basically when one clicks login it comes 
    const onChange = (open: boolean) => {
        if (!open) {
          onClose();
        }
      }
    //close the modal once youve successfully logged in or registered
    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
          }
    },[session, router, onClose])
    


    return (
        <Modal
        title = "Welcome back"
        description = "Login to your account"
        isOpen={isOpen}
        onChange={onChange}>
            
            <Auth 
            theme='dark'
            magicLink
            providers={["github","google"]}
            supabaseClient={supabaseClient}
            appearance={{
                theme:ThemeSupa, 
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e'
                        }
                    }
                }
            }}/>

        </Modal>
    )
}

export default AuthModal;