import React from 'react'
import Moment from 'react-moment';
import { formatShortNumber, formatLongNumber, calcMargin, calcROI, calcProfit } from '../../utils';

import './Flip.scss';

function Flip({ flip, crudFunctions }) {

  const toggleExpand = (e) => {
    e.target.parentElement.parentElement.classList.toggle('expanded');
  }

  const onInputHandler = (e) => {
    if (!isNaN(e.target.value)) {
      const edit = {[e.target.name]: e.target.value};
      crudFunctions.editFlip(flip.id, edit);
    }
  }

  return (
    <li className="flip">
      <h3 className="flip__name">{flip.itemName}</h3>
      <div className="flip__details">
        <div className="flip__margin" data-tooltip={formatLongNumber(calcMargin(flip))}>
          <span className="thin-text block">Margin</span>
          <p>{formatShortNumber(calcMargin(flip))}</p>
        </div>
        <div className="flip__roi">
          <span className="thin-text block">ROI%</span>
          <p>{calcROI(flip)}</p>
        </div>
        <div className="flip__profit" data-tooltip={formatLongNumber(calcProfit(flip))}>
          <span className="thin-text block">Profit</span>
          <p>{formatShortNumber(calcProfit(flip))}</p>
        </div>
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
            <input className="flip__input" type="text" name="buyPrice" onInput={onInputHandler} value={flip.buyPrice} />
          </label>
          <label>
            Quantity
            <input className="flip__input" type="text" name="quantity" onInput={onInputHandler} value={flip.quantity} />
          </label>
          <label>
            Sell price
            <input className="flip__input" type="text" name="sellPrice" onInput={onInputHandler} value={flip.sellPrice} />
          </label>
        </div>
        <div className="flip__bottom-buttons">
          <button className="flip__refresh btn" onClick={() => crudFunctions.refreshFlip(flip.id)}>
            <i className="btn__icon fas fa-redo-alt"></i>
            Refresh
          </button>
          <button className="flip__complete btn btn--success" onClick={() => crudFunctions.setCompleteFlip(flip.id)}>
            <i className="btn__icon fas fa-check"></i> 
            <p>Complete</p>
          </button>
          <button className="flip__delete btn btn--danger" onClick={() => crudFunctions.deleteFlip(flip.id)}>
            <i className="btn__icon fas fa-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default Flip;