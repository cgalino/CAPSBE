import _ from "lodash"
import { getSession } from "@/services/session"

const getProfessionals = async (filter: any) => {
   const session = await getSession();

   filter.identificador = {
      $in: [
         "EQAU0208",
         "EQAU0235",
         "EQAU0301",
         "EQAU0239",
         "EQAU0702",
         "IT001TOT",
         // "IT001OST",
         // "IT001MEN",
         // "IT001ALT",
         // "IT003TOT",
         "ACC5DF",
         "CONT0002A"
      ]
   }
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professionals`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: session?.user.db,
               fields: [
                  "indicador",
                  "identificador",
                  "sector",
                  "any",
                  "centre",
                  "professionals",
                  "objectiu",
                  "invers",
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

const getBaixesProfessionals = async (filter: any) => {
   const session = await getSession();

   filter.identificador = {
      $in: [
         "IT001OST",
         "IT001MEN",
         "IT001ALT",
         "IT003TOT",
      ]
   }

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professionals`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: session?.user.db,
               fields: [
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

export const getChartIndicators = async (filtros: any) => {
   const data = await getTableIndicators(filtros);
   let res: any = [];
   for (const [key, indi] of (Object.entries(data) as [string, any][])) {
      for (const [key, prof] of (Object.entries(indi.professionals) as [string, any][])) {
         if (prof[Object.keys(prof)[new Date().getMonth() - 1]]) {
            res.push({
               name: key,
               data: prof[Object.keys(prof)[new Date().getMonth() - 1]]
            })
         } else {
            res.push({
               name: key,
               data: null
            })
         }
      }
   }
   let item = _.groupBy(res, 'name');

   let results: any = [];
   for (const [key, value] of (Object.entries(item) as [string, any][])) {
      let result: { name: string, data: number[], threshold: number, maxPointWidth: number } = {
         name: "",
         data: [],
         threshold: 0,
         maxPointWidth: 50
      };
      result.name = key
      value.map((i: any) => {
         result.data.push(i.data)
      })
      results.push(result);
   }
   return results;
}

export const getTableIndicators = async (filtros: any) => {
   let data = await getProfessionals(filtros);
   data.map(async (indi: any) => {
      if (indi.indicador == 'Durada mitjana de les baixes-') {
         indi.subtaula = await getBaixesProfessionals(filtros)
      }
   });
   return data;
}

export const getSections = async () => {
   const data = await getProfessionals({});
   let groupBySec = _.groupBy(data, 'sector');
   let sectors: string[] = [];
   for (const [key, value] of (Object.entries(groupBySec) as [string, any][])) {
      sectors.push(key);
   }
   return sectors;
}

export const getYears = async () => {
   const data = await getProfessionals({});
   let groupByYear = _.groupBy(data, 'any');
   let years: string[] = [];
   for (const [key, value] of (Object.entries(groupByYear) as [string, any][])) {
      years.push(key);
   }
   return years;
}

export const getProfessionalsList = async (filtros: any) => {
   const data = await getProfessionals(filtros);
   let prof: string[] = [];
   for (const [key, value] of (Object.entries(data) as [string, any][])) {
      for (const [key] of (Object.entries(value.professionals) as [string, any][])) {
         if (!prof.includes(key)) {
            prof.push(key);
         }
      }
   }
   return prof;
}

export const getCentre = async (professional: string) => {
   const data = await getProfessionals({});
   for (let i = 0; i < data.length; i++) {
      for (const [key, value] of (Object.entries(data[i].professionals) as [string, any][])) {
         if (key.includes(professional)) {
            return data[i].centre;
         }
      }
   }
}

export const getIndicators = async (filtros: any) => {
   const data = await getTableIndicators(filtros);
   let indi: any = [];
   for (const [key, value] of (Object.entries(data) as [string, any][])) {
      indi.push({ 'name': key, 'obj': data[key].invers == false ? data[key].objectiu : -data[key].objectiu });
   }
   return indi;
}

export const getChartIndividual = async (filtros: any, professional: string) => {
   const data = await getProfessionals(filtros);
   let chart: any[] = [];
   let item: { name: string, data: number[] };
   data.map((d: any, i: number) => {
      for (const [key, value] of (Object.entries(d.professionals) as [string, any][])) {
         if (key.includes(professional)) {
            chart.push({
               name: d.indicador,
               data: value
            })
         }
      }
   })
   return chart;
}

export const getMonth = async (filtros: any) => {
   const data = await getProfessionals(filtros);
   const meses = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre']
   let mes = data[0].professionals[Object.keys(data[0].professionals)[0]].length - 1;

   return meses[mes];
}