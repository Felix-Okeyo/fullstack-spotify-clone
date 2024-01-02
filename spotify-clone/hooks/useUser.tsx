
import { UserDetails, Subscription } from "@/types";
import { createContext, useEffect, useState, useContext } from "react";

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
export const UserContext = createContext <UserContextType | undefined> (
    undefined
);

// define props interface that is a flexible dictionary like structure with strings and values
export interface Props {
    [propName: string]: any;
  }

//useSessionContext allows to extract properties from the MyUserContextProvider because the whole app
//is wrapped by supabase in the layout.tsx file
//the below hook allows you to integrate state to check the user details, subscriptions, and other data through state and can be reused easily
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


    //define functions that will now access the details of the user through this hook 
    const getUserDetails = () => supabase.from('users').select('*').single(); //get user details from supabase
    //function for get subscriptions details from supabase
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single();
    
  //the now use a useEffect to fetch the data and assign it to the MyUserContextProvider state
  useEffect(() => {
    //set setisloafdingdata true if user is logged in and we don't have the loadingdata, userdetails and subcriptions 
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);
      //the promise is to get the user details first then subscriptions details second
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];
          
          //if the above two promises are fulfilled set their reponses to state variables in my MyUserContextProvider
          if (userDetailsPromise.status === 'fulfilled')
            setUserDetails(userDetailsPromise.value.data as UserDetails);

          if (subscriptionPromise.status === 'fulfilled')
            setSubscription(subscriptionPromise.value.data as Subscription);

          //now that you have the data toggle off the setisloadingdata state to false
          setIsloadingData(false);
        }
      );
      // else if we are not loading, set everything to null
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
}, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
};

  return <UserContext.Provider value={value} {...props} />;
}


//create the holistic hook to be exported and reused now 
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
