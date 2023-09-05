import { GetLinksYears } from "./routing";
import { getYears } from "@/services/contracts";

export default async function ContractsLayout({ children }: any) {
   const years = await getYears();
   return (
      <div>
         <title>Indicadors Contracte</title>
         <div className="h-20 bg-light text-right flex justify-between items-center">
            <div className="flex justify-between grow mb-2 mx-4">
               <GetLinksYears
                  years={years}
               />
            </div>
            <div className="h-20 bg-light text-right flex justify-end items-center">
               <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Indicadors Contracte</h1>
            </div>
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2 border-darkBlue" />
         <main className="m-2">
            {children}
         </main>
      </div>
   )
}