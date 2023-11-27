"use client";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react"

function AuthModal() {
    const superbaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();

  return (
    <Modal title="welcome back" description="Login to your acccount" isOpen onChange={()=>{}}>
        <Auth supabaseClient={supabaseClient}/>
    </Modal>
  )
}

export default AuthModal