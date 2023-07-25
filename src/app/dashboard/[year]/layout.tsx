import { getTableIndicators } from "@/services/indicators";
import { getCenters } from "@/services/centros";
import { getEqasContracts } from "@/services/eqas";
import { ContractsTable } from "./table"
import { Chart } from "./[center]/chart";
import { GetLinksCenters } from "../routing";

export default async function loadContracts({ children, params }: any) {

   const { year } = params;
   const centros = await getCenters();
   const eqas = await getEqasContracts(year, centros);

   const indicadores = await getTableIndicators(year);

   return (
      <article className="min-h-fit">
         <section className="flex flex-row justify-between px-5 mb-2">
            <div id='tabla_contratos' className="rounded-md overflow-hidden w-3/4 bg-body">
               <ContractsTable
                  data={indicadores}
                  centros={centros}
               />
            </div>
            <div className="w-1/4">
               <div className="mx-2 mb-2 p-1 h-max bg-bgLight rounded-md shadow-xl">
                  <Chart className="h-max"
                     name={'TOTAL EQA'}
                     data={eqas}
                  />
               </div>
            </div >
         </section >
         <div className="flex flex-row justify-between px-5">
            <div className="w-1/2 mr-2 mb-2 p-1 bg-bgLight rounded-md shadow-xl">
               <GetLinksCenters
                  centros={centros}
               />
               {children}
            </div >
            <div className="w-1/2 mr-2 mb-2 p-1 bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'TOTAL EQA'}
                  data={eqas}
               />
            </div>
         </div >
      </article >
   );
}
