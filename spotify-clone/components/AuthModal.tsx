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


    return (
        <Modal
        title = "Welcome back"
        description = "Login to your account"
        isOpen
        onChange={()=>{}}>
            
            <Auth supabaseClient={supabaseClient}/>

        </Modal>
    )
}

export default AuthModal;