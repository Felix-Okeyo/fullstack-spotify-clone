"use client"; //the sidebar component will be dynamically loaded hence mark it as so

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";


// defint interface name props and pass it as children in the sidbar component funtion 
interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> =({children}) => {

    // hooks 
    const pathname = usePathname();

    // create an array of possible routes in the project 
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label : 'Home', //name of the sidebar
            active: pathname !== '/search', //active whenever the pathname is not 'search'
            href: '/', //the URL is home
        },
        {
            icon: BiSearch,
            label : 'Search', //name of the sidebar
            active: pathname === '/search', //active whenever the pathname is search
            href: '/search', //the URL is search
        }
    ], [pathname]) //add pathname to the list of our dependeny arrays

    return (
        <div className="flex h-full">
            <div className ="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                   <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map(item =>(<SidebarItem key={item.label} {...item} />)
                        )}
                   </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    Song Library
                </Box>
            </div>
        </div>
    )
}

export default Sidebar