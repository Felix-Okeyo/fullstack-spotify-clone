"use client"; //the sidebar component will be dynamically loaded hence mark it as so

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";


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
            <div className ="hidden md:flex">
                
            </div>
        </div>
    )
}

export default Sidebar