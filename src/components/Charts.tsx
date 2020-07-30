import React, { useEffect, useState } from 'react';
import Chart, { Props as ChartProps } from 'react-apexcharts';
const downloadIcon = require('../assets/svg/download-solid.svg') as string;

export interface LineChartProps {
  id?: string;
  xAxis?: any[];
  series?: {
    name: string;
    data: any[];
  }[];
  background?: string;
  height?: string | number;
  width?: string | number;
}

export const LineChart = (props: LineChartProps) => {
  const [chartData, setChartData] = useState<ChartProps>({});
  const [chartWidth, setChartWidth] = useState<any>('');
  useEffect(() => {
    let data: ChartProps = {};
    data.options = {
      chart: {
        id: props.id,
        fontFamily: "'Dosis', 'Poppins', sans-serif",
        background: props.background || '',
        redrawOnParentResize: true,
        toolbar: {
          show: true,
          tools: {
            download: `<img src="${downloadIcon}" style="width: 20px;height: 20px; color: #ddd"/>`,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [],
          },
        },
      },
      xaxis: {
        categories: props.xAxis,
      },
    };
    data.height = props.height || 'auto';
    data.series = props.series;
    data.width = props.width || '100%';
    setChartData(data);
    if (chartWidth) {
      if (chartWidth !== document.getElementById(`linechart-${props.id}`)?.offsetWidth) {
        setChartData({ ...chartData });
        setChartWidth(document.getElementById(`linechart-${props.id}`)?.offsetWidth);
      }
    } else {
      setTimeout(function () {
        setChartWidth(document.getElementById(`linechart-${props.id}`)?.offsetWidth);
      }, 10);
    }
    return () => {
      console.log('cleaned up');
    };
  }, []);

  return <div id={`linechart-${props.id}`}>{chartData.series ? <Chart {...chartData}></Chart> : ''}</div>;
};
