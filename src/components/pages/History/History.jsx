import React from 'react'

import './History.scss';

function History() {
  return (
    <>
      <h2 className="section-title">Flip history</h2>
      <table>
        <thead>
          <tr>
            <th>Item name</th>
            <th>Buy price</th>
            <th>Sell price</th>
            <th>Margin</th>
            <th>Quantity</th>
            <th>ROI%</th>
            <th>Profit</th>
          </tr>
        </thead>
      </table>
    </>
  );
};

export default History;

// console.log(moment(newFlip.createdAt).format('DD/MM/YYYY'));
