import React from 'react'
import { formatLongNumber, calcProfit } from './../../../utils';

import './History.scss';

function History({ flips }) {

  const completedFlips = flips.filter((flip) => flip.isComplete);
  const totalProfit = completedFlips.reduce((total, flip) => total += calcProfit(flip), 0);

  return (
    <main className="flip-history">
      <h2 className="section-title">Total profit: {formatLongNumber(totalProfit)}</h2>
    </main>
  );
};

export default History;

// console.log(moment(newFlip.createdAt).format('DD/MM/YYYY'));
