//integrate the MyContextProvider integration of the custom hook that handles state to
//a the useUser component that will handle the provisions in the app depending on the 
//state and details of the user. Then wrap it within the superbase at the layout.tsx file. this handles checking in whether logged in or not
"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({
  children
}) => {
  return ( 
    <MyUserContextProvider>
      {children}
    </MyUserContextProvider>
   );
}
 
export default UserProvider;