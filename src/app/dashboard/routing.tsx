'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();

   let links: object[] = [];
   years.map((label: any) => (
      links.push({
         label: label,
         route: `/dashboard/${label}`
      })
   ))

   return (
      <div className="flex">
         {links.map(({ label, route }: any) => (
            <Link className={`my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(route) ? 'bg-darkBlue text-white' : 'bg-bgDark bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`} key={route} href={route}>
               {label}
            </Link>
         ))}
      </div>
   )
}

export function GetLinksCenters(centros: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const year = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_YEAR;

   let links: any[] = [];

   centros.centros.map(({ id, name }: any) => (
      links.push({
         label: name,
         route: `/dashboard/${year}/${id}`
      })
   ))

   return (
      <div className="text-center m-auto absolute z-10 my-4" >
         {links.map((centro: any, i: number) => (
            <Link href={centro.route} key={i} className={`my-1 mx-4 py-2.5 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(centro.route) ? 'bg-darkBlue text-white' : 'bg-bgDark bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`}>
               {centro.label}
            </Link>
         ))}
      </div>
   )
}

export function GetSectionButtons() {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const year = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_YEAR;

   let links: object[] = [{
      label: 'General',
      route: `/dashboard/${year}/general`
   }, {
      label: 'CPR',
      route: `/dashboard/${year}/cpr`
   }, {
      label: 'Contractes',
      route: `/dashboard/${year}/contractes`
   }];

   return (
      <div className="flex">
         {links.map(({ label, route }: any) => (
            <Link className={`my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(route) ? 'bg-darkBlue text-white' : 'bg-bgDark bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`} key={route} href={route}>
               {label}
            </Link>
         ))}
      </div>
   )
}