import React from 'react';
import { Bar } from 'react-chartjs-2';


import './Chart.scss';

function Chart({ data, numOfDays }) {

  const displayData = data.slice(0, numOfDays);

  const labelData = displayData.map((obj) => obj.date);
  const profitData = displayData.map((obj) => obj.profit);
  const flipCountData = displayData.map((obj) => obj.flipCount);

  const chartData = {
    labels: labelData,
    datasets: [
      {
        label: 'Profit',
        type: 'bar',
        data: profitData,
        yAxisID: 'profit',
        order: 2,
        borderColor: 'rgb(238, 238, 238)',
        borderWidth: 2,
        backgroundColor: 'rgb(51, 51, 51)',
        maxBarThickness: 100,
      },
      {
        label: 'Flip count',
        type: 'line',
        data: flipCountData,
        yAxisID: 'flipCount',
        order: 1,
        fill: false,
        borderColor: 'rgb(80, 225, 255)',
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: `Last ${numOfDays} flipping days`
    },
    scales: {
      yAxes: [
        {
          id: 'profit',
          type: 'linear',
          position: 'left',
          ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
              return `${value} gp`;
            },
          },
        },
        {
          id: 'flipCount',
          type: 'linear',
          position: 'right',
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
          gridLines: {
            display: false,
          },
        },
      ]
    },
    tooltips: {
      mode: 'index',
      titleMarginBottom: 12,
      bodySpacing: 8,
      yPadding: 12,
      xPadding: 12,
    }
  }
  
  return (
    <div className="chart">
      <div className="chart__container">
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    </div>
  )
}

export default Chart;
