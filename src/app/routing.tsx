'use client'
import Link from "next/link"
import { BiCapsule, BiPlusMedical } from "react-icons/bi"
import { FaCapsules, FaUserNurse } from "react-icons/fa"
import { RiHospitalFill } from "react-icons/ri"
import { IoGitCompare } from "react-icons/io5"
import { AiOutlineFolder } from "react-icons/ai"
import { usePathname } from "next/navigation"
import { LogoutButton, ProfileButton } from "@/components/loginbuttons.component";
import { NextAuthProvider } from "@/app/providers";

export default function GetNav() {

   const pathname = usePathname();

   const navTitlesIcons = [
      {
         label: 'Dashboard',
         icon: FaCapsules,
         route: '/dashboard'
      },
      {
         label: 'Professionals',
         icon: FaUserNurse,
         route: '/professionals'
      }
   ]
   const navTitlesIconsFarma = [
      {
         label: 'IQF',
         icon: BiCapsule,
         route: '/iqf'
      }
   ]


   return (
      <div className="fixed top-0 left-0 z-50 w-16 h-screen bg-nav pt-4 pr-3 pb-0 pl-0 hover:w-80 transition-all duration-500">
         <nav className="text-textColor p-3 flex flex-col justify-between h-full overflow-hidden">
            <div>
               <Link href="/" className="text-yellowCustom text-xl font-bold grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-7 pl-2">
                  <BiPlusMedical size={30} />
                  <span className="text-2xl">CAPFA</span>
               </Link>
               <div className="flex flex-col justify-between" id="lista">
                  {navTitlesIcons.map((navTI) => (
                     <Link key={navTI.route} href={navTI.route} className={`hover:text-darkBlue pb-6 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pl-3 items-center
                     ${pathname?.includes(navTI.route) ? 'text-darkBlue' : ''}`}>
                        <navTI.icon size={20} />
                        <span className="text-lg">
                           {navTI.label}
                        </span>
                     </Link>
                  ))}
                  <hr className="my-4 border-textColor" />
                  <div className="text-yellowCustom text-xl font-bold grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-7 pl-2">
                     <FaCapsules size={30} />
                     <h3>
                        Farmàcia
                     </h3>
                  </div>
                  {navTitlesIconsFarma.map((navTI) => (
                     <Link key={navTI.label} href={navTI.route} className="hover:text-darkBlue pb-6 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0  pl-3 items-center">
                        <navTI.icon size={20} />
                        <span className="text-lg">
                           {navTI.label}
                        </span>
                     </Link>
                  ))}
               </div>
            </div>
            <div>
               <NextAuthProvider>
                  <div>
                     <ProfileButton />
                     <LogoutButton />
                  </div>
               </NextAuthProvider>
            </div>
         </nav>
      </div>
   )
}
