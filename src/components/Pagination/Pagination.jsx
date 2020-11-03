import React from 'react';

import './Pagination.scss'

function Pagination({ flipsPerPage, totalFlips, changePage, currentPage }) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalFlips / flipsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
      <li className='pagination__item' key={number}>
        <a 
          className={currentPage === number ? 'pagination__page pagination__page--current' : 'pagination__page'} 
          href="#" 
          onClick={() => changePage(number)}
        >
          {number}
        </a>
      </li>
      ))}
    </ul>
  )
}

export default Pagination;
