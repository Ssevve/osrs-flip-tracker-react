import React, { useState, useEffect } from 'react'

import moment from 'moment';

import './Flip.scss';

function Flip(props) {
  const [flip, setFlip] = useState(props.flip);
  const [timeAgo, setTimeAgo] = useState(moment(flip.createdAt).fromNow());

  useEffect(() => {
    const interval = setInterval(() => setTimeAgo(moment(flip.createdAt).fromNow()), 60000);
    return () => {
      clearInterval(interval);
  };
});

  const toggleExpand = (e) => {
    e.target.parentElement.parentElement.classList.toggle('expanded');
  }

  const calcMargin = () => {
    return flip.sellPrice ? flip.sellPrice - flip.buyPrice : 'N/A';
  }

  const calcRoi = () => {
    return flip.sellPrice ? (calcMargin() / flip.buyPrice * 100).toFixed(2) : 'N/A';
  }

  const onInputHandler = (e) => {
    if (!isNaN(e.target.value)) {
      setFlip({...flip, [e.target.name]: e.target.value.trim()});
    }
  }

  const refreshFlip = () => {
    setFlip({...flip, createdAt: Date.now()});
    setTimeAgo(moment(flip.createdAt).fromNow());
  }

  return (
    <li className="flip">
      <h3 className="flip__name">{flip.itemName}</h3>
      <div className="flip__details">
        <p className="flip__margin">
          <span className="thin-text block">Margin</span>
          {calcMargin()}
        </p>
        <p className="flip__roi">
          <span className="thin-text block">ROI%</span>
          {calcRoi()}
        </p>
        <p className="flip__profit">
          <span className="thin-text block">Profit</span>
          {(flip.sellPrice * flip.quantity) - (flip.buyPrice * flip.quantity)}
        </p>
        <p className="flip__time">
          {timeAgo}
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
            Sell price
            <input className="flip__input" type="text" name="sellPrice" onInput={onInputHandler} value={flip.sellPrice} />
          </label>
          <label>
            Quantity
            <input className="flip__input" type="text" name="quantity" onInput={onInputHandler} value={flip.quantity} />
          </label>
          {/* <button className="btn" onClick={updateFlip}>Update</button> */}
        </div>
        <div className="flip__bottom-buttons">
          <button className="flip__refresh btn" onClick={refreshFlip}>
            <i className="btn__icon fas fa-redo-alt"></i>
            Refresh
          </button>
          <button className="flip__complete btn btn--success">
            <i className="btn__icon fas fa-check"></i> 
            <p>Complete</p>
          </button>
          <button className="flip__delete btn btn--danger">
            <i className="btn__icon fas fa-trash"></i>
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}

export default Flip;