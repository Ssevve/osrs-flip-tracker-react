import React, { useState, useContext } from 'react'
import { formatLongNumber, calcProfit } from './../../../utils';
import ReactPaginate from 'react-paginate';

import FlipContext from '../../../context/FlipContext';

import moment from 'moment';

import './History.scss';

// Component imports
import Chart from '../../Chart/Chart';
import FlipContainer from '../../FlipContainer/FlipContainer';

function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [flipsPerPage] = useState(5);
  const [numOfDays] = useState(7);

  const {flips, crudFunctions} = useContext(FlipContext);

  const completedFlips = flips.filter((flip) => flip.isComplete);
  // console.log({completedFlips});

  const flipsData = [];

  // Generate data for each unique date (date, profit, number of flips)
  // Store the data in the flipsData array
  if (completedFlips.length > 0) {

    let date = moment(completedFlips[0].createdAt).format('DD/MM/YY');
    let profit = 0;
    let flipCount = 0;

    completedFlips.forEach((flip, i) => {
      const currentFlipDate = moment(flip.createdAt).format('DD/MM/YY');
      const currentFlipProfit = calcProfit(flip);
      const isLastIndex = (i === completedFlips.length - 1);

      if (currentFlipDate === date) {
        profit += currentFlipProfit;
        flipCount++;

        if (isLastIndex) {
          flipsData.push({ date, flipCount, profit });
        }
      } else {
        flipsData.push({ date, flipCount, profit });
        flipCount = 1;
        profit = currentFlipProfit;
        date = currentFlipDate;

        if (isLastIndex) {
          flipsData.push({ date, flipCount, profit });
        }
      }
    });
  }
  // console.log(flipsData);

  // Get total profit of the completed flips
  const totalProfit = flipsData.reduce((total, current) => total += current.profit, 0);


  // Calc flips to show on the current page
  const indexOfLastFlip = currentPage * flipsPerPage;
  const indexOfFirstFlip = indexOfLastFlip - flipsPerPage;
  const currentFlips = completedFlips.slice(indexOfFirstFlip, indexOfLastFlip);

  // Get total number of pages
  const pageCount = Math.ceil(completedFlips.length / flipsPerPage);

  const changePage = ({ selected: selectedPage }) => setCurrentPage(selectedPage + 1);

  return (
    <main className="main">
      <h2 className="section-title">Total profit: {formatLongNumber(totalProfit)}</h2>
      <Chart data={flipsData} numOfDays={numOfDays} />
      <FlipContainer
        crudFunctions={crudFunctions}
        displayFlips={currentFlips}
        flipCount={completedFlips.length}
        title="Completed Flips"
      />
      <ReactPaginate
        containerClassName="pagination"
        pageLinkClassName="pagination__link"
        activeLinkClassName="pagination__link--active"
        previousLinkClassName="pagination__link"
        nextLinkClassName="pagination__link"
        breakClassName="pagination__break"
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        onPageChange={changePage}
      />
    </main>
  );
};

export default History;

// console.log(moment(newFlip.createdAt).format('DD/MM/YYYY'));
