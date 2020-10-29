import React, { useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

import './NewFlipForm.scss';

const initialFlipState = {
  itemName: '',
  buyPrice: '',
  quantity: '',
  sellPrice: '',
  createdAt: Date.now(),
  isComplete: false
};

const initialErrors = {
  itemNameError: '',
  buyPriceError: '',
  quantityError: '',
  sellPriceError: '',
};

function NewFlipForm({ addFlip }) {
  const [newFlip, setNewFlip] = useState(initialFlipState);
  const [formErrors, setFormErrors] = useState(initialErrors);

  const onInputHandler = (e) => {
    setNewFlip({...newFlip, [e.target.name]: e.target.value});
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      addFlip({...newFlip, id: uuidv4()});
      setNewFlip(initialFlipState);
      setFormErrors(initialErrors);
    }  
  }

  const validateForm = () => {
    let itemNameError = '';
    let buyPriceError = '';
    let quantityError = '';
    let sellPriceError = '';

    if (!newFlip.itemName.trim()) {
      itemNameError = 'Item name cannot be empty';
    }

    if (!newFlip.buyPrice.trim()) {
      buyPriceError = 'Buy price cannot be empty';
    } else if (isNaN(newFlip.buyPrice.trim())) {
      buyPriceError = 'Buy price must be a number';
    }

    if (!newFlip.quantity.trim()) {
      quantityError = 'Quantity cannot be empty';
    } else if (isNaN(newFlip.quantity.trim())) {
      quantityError = 'Quantity must be a number';
    }

    if (isNaN(newFlip.sellPrice.trim())) {
      sellPriceError = 'Sell price must be a number';
    }

    if (itemNameError || buyPriceError || 
        quantityError || sellPriceError) {
          setFormErrors({ itemNameError, buyPriceError, quantityError, sellPriceError });
          return false;
    }

    return true;
  }

  return (
    <>
      <form className="form" onSubmit={formSubmitHandler}>
        <h2 className="form__title">Add new flip</h2>
        <div className="form__group">
          <label className="form__label">
            Item name
            <span className="required-asterisk"> *</span>
            <input 
              className={formErrors.itemNameError ? 'form__input error' : 'form__input'}
              type="text" 
              name="itemName" 
              value={newFlip.itemName} 
              onInput={onInputHandler} 
            />
          </label>
          <small className="form__error">{formErrors.itemNameError}</small>
        </div>
        <div className="form__group">
          <label className="form__label">
            Buy price
            <span className="required-asterisk"> *</span>
            <input 
              className={formErrors.buyPriceError ? 'form__input error' : 'form__input'} 
              type="text" 
              name="buyPrice" 
              value={newFlip.buyPrice} 
              onInput={onInputHandler} 
            />
          </label>
          <small className="form__error">{formErrors.buyPriceError}</small>
        </div>
        <div className="form__group">
          <label className="form__label">
            Quantity
            <span className="required-asterisk"> *</span>
            <input 
              className={formErrors.quantityError ? 'form__input error' : 'form__input'} 
              type="text" 
              name="quantity" 
              value={newFlip.quantity} 
              onInput={onInputHandler} 
            />
          </label>
          <small className="form__error">{formErrors.quantityError}</small>
        </div>
        <div className="form__group">
          <label className="form__label">
            Sell price
            <input 
              className={formErrors.sellPriceError ? 'form__input error' : 'form__input'} 
              type="text" 
              name="sellPrice" 
              value={newFlip.sellPrice} 
              onInput={onInputHandler} 
            />
          </label>
          <small className="form__error">{formErrors.sellPriceError}</small>
        </div>
        <label className="form__checkbox-label" htmlFor="add-status">
          Mark complete
          <input 
            className="form__checkbox" 
            id="add-status" 
            type="checkbox" 
            onChange={() => setNewFlip({...newFlip, isComplete: !newFlip.isComplete})} 
          />  
        </label>
        <input className="btn form__submit" type="submit" value="Add" />
      </form>
    </>
  )
}

export default NewFlipForm;