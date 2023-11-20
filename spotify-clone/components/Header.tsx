"use client"

import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
    childen: React.ReactNode;
    className?: string;
  }
  
const Header = ({
    children, 
    className
}) => {
    const router = useRouter

    const handleLogout = () => {
        //hnadle logouts
    }
  return (
    <div className={twMerge(`
    h-fit
    bg-gradient-to-b
    from-emerald-600
    p-6
    `)}>
        Hello Header
    </div>
  )
}

export default Header