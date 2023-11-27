
import { UserDetails, Subscription } from "@/types";
import { createContext, useState } from "react";

import { User } from "@supabase/auth-helpers-nextjs";
//the useUser is mapped as useSupaUser to be used as a custom hook to avoid conflicts 
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react"; 

//write context type
type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
  };

// export the context type
export const UserContextType = createContext <UserContextType | undefined> (
    undefined
);

// define props interface that is a flexible dictionary like structure with strings and values
export interface Props {
    [propName: string]: any;
  }

//useSessionContext allows to extract properties from the MyUserContextProvider because the whole app
//is wrapped by supabase in the layout.tsx file
  export const MyUserContextProvider = (props: Props) => {
    const {
      session,
      isLoading: isLoadingUser,
      supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsloadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

  }