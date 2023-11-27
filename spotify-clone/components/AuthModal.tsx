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
    const {onClose, isOpen} = useAuthModal();

    //close the modal once signed in
    useEffect(()=>{
        if (session){
            router.refresh();
            onClose();
        }
    },[session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

  return (
    <Modal title="welcome back" description="Login to your acccount" isOpen onChange={onChange}>
        <Auth supabaseClient={supabaseClient}
            theme = "dark"
            magicLink
            providers={["github", "apple", "facebook", "google"]}
            appearance ={{
                theme: ThemeSupa,
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