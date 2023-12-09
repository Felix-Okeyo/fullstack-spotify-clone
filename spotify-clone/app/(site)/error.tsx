//handles errors when loggin in
"use client";
import Box from "@/components/Box";

const error = () => {
  return (
    //reuse the box component 
    <Box className="h-full flex items-center justify-center">
            <div className="text-neutral-400">
                Something went wrong with logging in.
            </div>  
    </Box>
   
  )
}

export default error