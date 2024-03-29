'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
   HighchartsExportData(Highcharts)
}

export function Chart({ name, data, objectiu, invers }: any) {
   let max = 0;
   let min = 100;
   data.forEach((elem: any) => {
      elem.data.map((i: any) => {
         max = (i > max) ? i : max;
         min = (i < min) ? i : min;
      });
   });
   max = (objectiu > max) ? objectiu : max;
   min = (objectiu < min) ? objectiu : min;

   const obj = (invers) ? objectiu.replace(/\D/g, '') : objectiu
   const options = {
      ...chartOptions,
      chart: {
         type: 'spline',
         spacingTop: 30
      },
      title: {
         text: name
      },
      series: data,
      yAxis: {
         ...chartOptions.yAxis,
         max: max,
         min: min,
         plotLines: [{
            color: 'var(--red)',
            width: 2,
            value: obj
         }]
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}