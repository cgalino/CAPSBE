'use client'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { chartOptions } from '@/components/chart.components'

if (typeof Highcharts === "object") {
   HighchartsExporting(Highcharts)
}

export function ChartDetail({ name, data, objectius, categories }: any) {
   let max = 0;
   data.forEach((elem: any) => {
      elem.data.map((i: any) => {
         max = (i > max) ? i : max;
      });
   });
   objectius.forEach((elem: any) => {
      max = (elem.value > max) ? elem.value : max;
   });

   const options = {
      ...chartOptions,
      chart: {
         type: 'line',
         spacingTop: 30
      },
      title: {
         text: name
      },
      series: data,
      yAxis: {
         ...chartOptions.yAxis,
         max: max,
         plotLines: objectius
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.y} punts</b><br/>'
      },
      plotOptions: {
         series: {
            borderWidth: 0,
            dataLabels: {
               enabled: true,
               color: 'white'
            }
         }
      }
   }

   return (
      <HighchartsReact
         highcharts={Highcharts}
         options={options}
      />
   )
}