import React from 'react'
import './NewFlipForm.scss';

function NewFlipForm() {
  return (
    <form className="form">
      <label className="form__label">
        Item name
        <input className="form__input" type="text" />
      </label>
      <label className="form__label">
        Buy price
        <input className="form__input" type="text" />
      </label>
      <label className="form__label">
        Quantity
        <input className="form__input" type="text" />
      </label>
      <label className="form__label">
        Sell price
        <input className="form__input" type="text" />
      </label>
      <label className="form__checkbox-label" for="add-status">
        Mark completed
        <input className="form__checkbox" id="add-status" type="checkbox" />  
      </label>
      <input className="btn form__submit" type="submit" value="Add" />
    </form>
  )
}

export default NewFlipForm;