'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const section = (pathArray[4]) ? pathArray[4] : process.env.DASHBOARD_DEFAULT_SECTION;
   const up = (pathArray[2]) ? pathArray[2] : null;

   let links: object[] = [];
   years.map((label: any) => (
      links.push({
         label: label,
         route: `/dashboard/${up}/${label}/${section}`
      })
   ))

   return (
      <div className="flex">
         {links.map(({ label, route }: any) => (
            <Link className={`my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(route) ? 'bg-darkBlue text-textColor' : 'bg-bgDark hover:bg-bgLight'}`} key={route} href={route}>
               {label}
            </Link>
         ))}
      </div>
   )
}

export function GetLinksCenters({ centros }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const year = (pathArray[3]) ? pathArray[3] : process.env.PROFESSIONALS_DEFAULT_YEAR;
   const section = (pathArray[4]) ? pathArray[4] : process.env.DASHBOARD_DEFAULT_SECTION;

   let links: any[] = [];

   centros.forEach((centro: any) => {
      if (centro.name != 'Pediatria') {
         links.push({
            label: centro.name,
            route: `/dashboard/${centro.id}/${year}/${section}`
         })
      }
   });

   return (
      <div className="flex" >
         {links.map((centro: any, i: number) => (
            <Link href={centro.route} key={i} className={`my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(centro.route) ? 'bg-darkBlue text-textColor' : 'bg-bgDark hover:bg-bgLight'}`}>
               {centro.label}
            </Link>
         ))}
      </div>
   )
}

export function GetSectionButtons() {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const year = (pathArray[3]) ? pathArray[3] : process.env.PROFESSIONALS_DEFAULT_YEAR;
   const center = (pathArray[2]) ? pathArray[2] : null;

   let links: object[] = [{
      label: 'General',
      route: `/dashboard/${center}/${year}/general`
   }, {
      label: 'CPR',
      route: `/dashboard/${center}/${year}/cpr`
   }, {
      label: 'Sense CPR',
      route: `/dashboard/${center}/${year}/nocpr`
   }, {
      label: 'Contractes',
      route: `/dashboard/${center}/${year}/contractes`
   }];

   return (
      <div className="flex">
         {links.map(({ label, route }: any) => (
            <Link className={`my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(route) ? 'bg-darkBlue text-textColor' : 'bg-bgDark hover:bg-bgLight'}`} key={route} href={route}>
               {label}
            </Link>
         ))}
      </div>
   )
}