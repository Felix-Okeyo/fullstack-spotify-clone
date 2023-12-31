"use client"; //the sidebar component will be dynamically loaded hence mark it as so

import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useMemo } from "react";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";



// defint interface name props and pass it as children in the sidbar component funtion 
interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar: React.FC<SidebarProps> =({children, songs}) => {

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

    //make the sidebar move dynamically based on the player being open or not
    const player = usePlayer();

    return (
        <div className={twMerge(`flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
        )}>
            <div className ="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                   <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map(item =>(<SidebarItem key={item.label} {...item} />)
                        )}
                   </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}

export default Sidebar