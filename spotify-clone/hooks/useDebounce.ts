//this hook prevents the app from always fetching whenver the user 
//is typing. The hook works by waiting for the user to stop typing
//then start fetching

import { useEffect, useState } from "react";

//user will start typing, pass delay on the inputed values to a particluar number of seconds
function useDebounce<T>(value: T, delay?: number): T {
    //set the state of the input
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    //the use effect will only get the debounced value after 500 milliseconds of user not typing anything
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || 500);

        //clear the timeout so that their is no overflow
        return () => {
            clearTimeout(timer);
        }
    },[value, delay]);
    return debouncedValue;
}

export default useDebounce; 