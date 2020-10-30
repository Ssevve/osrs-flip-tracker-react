import React from 'react'

import Moment from 'react-moment';

import './Flip.scss';

function Flip({ flip, deleteFlip, editFlip, refreshFlip, setCompleteFlip }) {

  const toggleExpand = (e) => {
    e.target.parentElement.parentElement.classList.toggle('expanded');
  }

  const calcMargin = () => {
    return flip.sellPrice ? flip.sellPrice - flip.buyPrice : 'N/A';
  }

  const calcROI = () => {
    return flip.sellPrice ? (calcMargin() / flip.buyPrice * 100).toFixed(2) : 'N/A';
  }

  const calcProfit = () => {
    return (flip.sellPrice * flip.quantity) - (flip.buyPrice * flip.quantity);
  }

  const onInputHandler = (e) => {
    if (!isNaN(e.target.value)) {
      const edit = {[e.target.name]: e.target.value};
      editFlip(flip.id, edit);
    }
  }

  // 
  // const round = (number, precision) => {
  //   const prec = Math.pow(10, precision);
  //   return Math.round(number * prec) / prec;
  // }
  
  // // Format number (1000 -> 1K, 1000000 -> 1M, etc.)
  // const pow = Math.pow, floor = Math.floor, abs = Math.abs, log = Math.log;
  // const abbr = 'KMBT';

  // const formatNumber = (number) => {
  //     let base = floor(log(abs(number))/log(1000));
  //     const suffix = abbr[Math.min(2, base - 1)];
  //     base = abbr.indexOf(suffix) + 1;
  //     return suffix ? round(number/pow(1000,base),2)+suffix : ''+number;
  // }

  const formatShortNumber = (number) => {
    return new Intl.NumberFormat('en', {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(number);
  }
  
  const formatLongNumber = (number) => {
    return new Intl.NumberFormat('en').format(number);
  }

  return (
    <li className="flip">
      <h3 className="flip__name">{flip.itemName}</h3>
      <div className="flip__details">
        <p className="flip__margin">
          <span className="thin-text block">Margin</span>
          {formatShortNumber(calcMargin())}
        </p>
        <p className="flip__roi">
          <span className="thin-text block">ROI%</span>
          {calcROI()}
        </p>
        <p className="flip__profit">
          <span className="thin-text block">Profit</span>
          {formatShortNumber(calcProfit())}
        </p>
        <p className="flip__time">
          <Moment interval={1000} fromNow>
              {flip.createdAt}
          </Moment>
        </p>
      </div>
      <div className="flip__expand">
        <i className="flip__expand-icon fas fa-chevron-down"></i>
        <input className="flip__expand-checkbox" onChange={toggleExpand} type="checkbox" aria-label="Expand flip" />
      </div>
      <div className="flip__edit-panel">
        <div className="flip__inputs">
          <label>
            Buy price
            <input className="flip__input" type="text" name="buyPrice" onInput={onInputHandler} value={flip.buyPrice.trim()} />
          </label>
          <label>
            Quantity
            <input className="flip__input" type="text" name="quantity" onInput={onInputHandler} value={flip.quantity.trim()} />
          </label>
          <label>
            Sell price
            <input className="flip__input" type="text" name="sellPrice" onInput={onInputHandler} value={flip.sellPrice.trim()} />
          </label>
        </div>
        <div className="flip__bottom-buttons">
          <button className="flip__refresh btn" onClick={() => refreshFlip(flip.id)}>
            <i className="btn__icon fas fa-redo-alt"></i>
            Refresh
          </button>
          <button className="flip__complete btn btn--success" onClick={() => setCompleteFlip(flip.id)}>
            <i className="btn__icon fas fa-check"></i> 
            <p>Complete</p>
          </button>
          <button className="flip__delete btn btn--danger" onClick={() => deleteFlip(flip.id)}>
            <i className="btn__icon fas fa-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default Flip;