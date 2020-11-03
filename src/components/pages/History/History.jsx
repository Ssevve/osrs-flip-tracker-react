import React, { useState } from 'react'
import { formatLongNumber, calcProfit } from './../../../utils';

import './History.scss';

// Component imports
import FlipContainer from '../../FlipContainer/FlipContainer';
import Pagination from '../../Pagination/Pagination';

function History({ flips, crudFunctions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [flipsPerPage] = useState(5);

  const completedFlips = flips.filter((flip) => flip.isComplete);
  const totalProfit = completedFlips.reduce((total, flip) => total += calcProfit(flip), 0);

  // Calc flips to show on the current page
  const indexOfLastFlip = currentPage * flipsPerPage;
  const indexOfFirstFlip = indexOfLastFlip - flipsPerPage;
  const currentFlips = flips.slice(indexOfFirstFlip, indexOfLastFlip);

  // Get total number of pages
  const pageCount = Math.ceil(completedFlips.length / flipsPerPage);
  console.log(pageCount);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="flip-history">
      <h2 className="section-title">Total profit: {formatLongNumber(totalProfit)}</h2>
      <FlipContainer
        crudFunctions={crudFunctions}
        flips={currentFlips}
        title="Completed Flips"
      />
      { pageCount > 1 &&
      <Pagination 
        flipsPerPage={flipsPerPage} 
        totalFlips={completedFlips.length} 
        changePage={changePage}
        currentPage={currentPage}
      />
      }
    </main>
  );
};

export default History;

// console.log(moment(newFlip.createdAt).format('DD/MM/YYYY'));
