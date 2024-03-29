import { GetLinksYears, GetLinksCenters, GetSectionButtons } from "./routing";
import { getYears } from "@/services/contracts";
import { getCenters } from "@/services/centros"

export default async function ContractsLayout({ children }: any) {
   const years = await getYears();
   const centers = await getCenters();
   return (
      <div>
         <title>Indicadors Contracte</title>
         <div className="mt-2 bg-light text-right flex justify-between items-center">
            <div className="flex justify-between grow mb-2 mx-2">
               <GetSectionButtons />
               <GetLinksCenters
                  centros={centers}
               />
               <GetLinksYears
                  years={years}
               />
            </div>
            <div className="bg-light text-right flex justify-end items-center">
               <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Indicadors Contracte</h1>
            </div>
         </div>
         <hr className="w-11/12 m-auto border-b border-darkBlue" />
         <main className="m-2">
            {children}
         </main>
      </div>
   )
}