'use client'
import React from 'react';
import DataTable from 'react-data-table-component';

export function ProfesionalsTable({ data, profesionals }: any) {

   let columns = [{
      name: 'Indicador',
      selector: (row: any) => row.Indicador,
      sortable: false,
      grow: 7,
      style: { fontSize: '16px', backgroundColor: '', color: '' }
   }];

   profesionals.map((prof: any) => {
      columns.push({
         name: prof,
         selector: row => row[prof],
         sortable: false,
         grow: 1,
         style: { fontSize: '', backgroundColor: '', color: '' }
      })
   });

   columns.push({
      name: 'Objectiu',
      selector: row => row.Objectiu,
      sortable: false,
      grow: 1,
      style: { fontSize: '', backgroundColor: '#666666', color: 'white' }
   })

   let tableData: any = [];
   for (const [key, indicador] of (Object.entries(data) as [string, any][])) {
      //let objetivo = (value[0].Objectiu < 0) ? `<${Math.abs(value[0].Objectiu)}` : value[0].Objectiu;
      let fila: { [k: string]: any } = {
         id: key,
         Indicador: key,
         Objectiu: 'objetivo'
      };

      indicador.map((centre: any) => {
         for (const [key, prof] of (Object.entries(centre.professionals) as [string, any][])) {
            fila[key] = prof[Object.keys(prof)[Object.keys(prof).length - 1]];
         }
      });
      tableData.push(fila);
   }

   return (
      <div className="rounded-lg overflow-hidden basis-1/2 bg-body">
         <DataTable
            className='max-w-full shadow-lg'
            columns={columns}
            data={tableData}
            // conditionalRowStyles={conditionalRowStyles}
            theme={'dark'}
         />
      </div>
   )

};
