import { IconType } from "react-icons"
import  Link  from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon, //write it like this to use it as a component 
    label, 
    active, 
    href}) =>{
    
  return (
    
        <Link 
        href={href} 
        className={twMerge(`flex 
        flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer 
        hover:text-white transition 
        text-neutral-400 py-1`, active && "text-white") // style the active route to be white
        // pass the icon below and this converts the text to icons automatically
        }>

        <Icon size={26}/> 
        <p className="truncate w-full">{label}</p>
        
        </Link>
        
 
   
  )
}

export default SidebarItem