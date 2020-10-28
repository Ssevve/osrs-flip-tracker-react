import React from 'react'

import './Flip.scss';

function Flip() {

  const onChangeHandler = (e) => {
    e.target.parentElement.parentElement.classList.toggle('expanded');
  }

  return (
    <li className="flip">
      <h3 className="flip__name">Rune scimitar ornament kit (guthix)</h3>
      <div className="flip__details">
        <p className="flip__margin"><span className="thin-text block">Margin</span>5</p>
        <p className="flip__roi"><span className="thin-text block">ROI%</span>32</p>
        <p className="flip__profit"><span className="thin-text block">Profit</span>750K</p>
        <p className="flip__time">a few seconds ago</p>
      </div>
      <div className="flip__expand">
        <i className="flip__expand-icon fas fa-chevron-down"></i>
        <input className="flip__expand-checkbox" onChange={onChangeHandler} type="checkbox" aria-label="Expand flip" />
      </div>
      <div className="flip__edit-panel">
        <div className="flip__inputs">
          <label>
            Buy price
            <input className="flip__input" type="text" />
          </label>
          <label>
            Sell price
            <input className="flip__input" type="text" />
          </label>
          <label>
            Quantity
            <input className="flip__input" type="text" />
          </label>
          <button className="btn">Update</button>
        </div>
        <div className="flip__bottom-buttons">
          <button className="flip__refresh btn">
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